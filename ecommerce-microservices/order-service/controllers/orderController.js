const axios = require("axios");
const Order = require("../models/Order");

exports.createOrder = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || !quantity) {
            return res.status(400).json({ message: "userId, productId and quantity are required" });
        }

        const productResponse = await axios.get(
            `${process.env.PRODUCT_SERVICE_URL}/products/${productId}`
        );
        const product = productResponse.data;

        const inventoryResponse = await axios.get(
            `${process.env.INVENTORY_SERVICE_URL}/inventory/${productId}`
        );
        const inventory = inventoryResponse.data;

        if (inventory.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient inventory" });
        }

        const totalAmount = product.price * quantity;

        const order = await Order.create({
            userId,
            productId,
            quantity,
            totalAmount
        });

        await axios.put(
            `${process.env.INVENTORY_SERVICE_URL}/inventory/${productId}`,
            { quantity: inventory.quantity - quantity }
        );

        try {
            await axios.post(`${process.env.ACTIVITY_SERVICE_URL}/activities`, {
                userId,
                action: "ORDER_CREATED",
                details: { orderId: order._id.toString(), totalAmount }
            });
        } catch (_) {
            // Activity logging should not prevent a successful order.
        }

        res.status(201).json(order);
    } catch (err) {
        const message = err.response?.data?.message || err.message;
        res.status(500).json({ message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        res.json(await Order.find().sort({ createdAt: -1 }));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });
        res.json(order);
    } catch (err) {
        res.status(400).json({ message: "Invalid order id" });
    }
};

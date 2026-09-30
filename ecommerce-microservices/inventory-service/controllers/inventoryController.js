const Inventory = require("../models/Inventory");

exports.createInventory = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        if (!productId || quantity === undefined) {
            return res.status(400).json({ message: "productId and quantity are required" });
        }
        const existing = await Inventory.findOne({ productId });
        if (existing) return res.status(409).json({ message: "Inventory already exists for this product" });

        const inventory = await Inventory.create({ productId, quantity });
        res.status(201).json(inventory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getInventory = async (req, res) => {
    try {
        res.json(await Inventory.find());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProductInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ productId: req.params.productId });
        if (!inventory) return res.status(404).json({ message: "Inventory not found" });
        res.json(inventory);
    } catch (err) {
        res.status(400).json({ message: "Invalid product id" });
    }
};

exports.updateInventory = async (req, res) => {
    try {
        const inventory = await Inventory.findOneAndUpdate(
            { productId: req.params.productId },
            { quantity: req.body.quantity },
            { new: true, runValidators: true }
        );
        if (!inventory) return res.status(404).json({ message: "Inventory not found" });
        res.json(inventory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

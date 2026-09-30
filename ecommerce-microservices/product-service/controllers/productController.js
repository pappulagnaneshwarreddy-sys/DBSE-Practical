const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;
        if (!name || !description || price === undefined || !category) {
            return res.status(400).json({ message: "name, description, price and category are required" });
        }
        const product = await Product.create({ name, description, price, category });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProducts = async (req, res) => {
    try {
        res.json(await Product.find());
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(400).json({ message: "Invalid product id" });
    }
};

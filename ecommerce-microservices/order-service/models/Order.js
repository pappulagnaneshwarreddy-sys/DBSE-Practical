const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true, min: 1 },
    totalAmount: { type: Number, required: true },
    status: { type: String, default: "CREATED" }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);

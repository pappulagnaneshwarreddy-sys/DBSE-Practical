const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
    userId: { type: String, required: true },
    action: { type: String, required: true },
    details: { type: Object, default: {} }
}, { timestamps: true });

module.exports = mongoose.model("Activity", activitySchema);

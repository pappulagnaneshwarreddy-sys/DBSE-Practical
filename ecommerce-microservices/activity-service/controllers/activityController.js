const Activity = require("../models/Activity");

exports.createActivity = async (req, res) => {
    try {
        const { userId, action, details } = req.body;
        if (!userId || !action) {
            return res.status(400).json({ message: "userId and action are required" });
        }
        const activity = await Activity.create({ userId, action, details });
        res.status(201).json(activity);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getActivities = async (req, res) => {
    try {
        res.json(await Activity.find().sort({ createdAt: -1 }));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

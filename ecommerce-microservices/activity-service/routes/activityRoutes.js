const express = require("express");
const router = express.Router();
const controller = require("../controllers/activityController");

router.post("/activities", controller.createActivity);
router.get("/activities", controller.getActivities);

module.exports = router;

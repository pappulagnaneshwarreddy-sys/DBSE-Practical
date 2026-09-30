const express = require("express");
const router = express.Router();
const controller = require("../controllers/orderController");

router.post("/orders", controller.createOrder);
router.get("/orders", controller.getOrders);
router.get("/orders/:id", controller.getOrder);

module.exports = router;

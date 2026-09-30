const express = require("express");
const router = express.Router();
const controller = require("../controllers/inventoryController");

router.post("/inventory", controller.createInventory);
router.get("/inventory", controller.getInventory);
router.get("/inventory/:productId", controller.getProductInventory);
router.put("/inventory/:productId", controller.updateInventory);

module.exports = router;

const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");

router.post("/users/register", controller.register);
router.post("/users/login", controller.login);
router.get("/users/:id", controller.getUser);

module.exports = router;

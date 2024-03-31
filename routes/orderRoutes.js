const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { placeOrderController } = require("../controllers/orderController");
const router = express.Router();

// Place an order || POST
router.post("/placeOrder", authMiddleware, placeOrderController);

module.exports = router;

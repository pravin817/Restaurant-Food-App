const express = require("express");
const adminMiddleware = require("../middlewares/adminMiddleware");
const { orderStatusController } = require("../controllers/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Change the order status
router.post(
  "/orderStatus/:id",
  authMiddleware,
  adminMiddleware,
  orderStatusController
);

module.exports = router;

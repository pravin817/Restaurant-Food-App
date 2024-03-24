const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

// Routes
// Create / Add new Resturant || POST
router.post("/create", authMiddleware, createRestaurantController);

module.exports = router;

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createRestaurantController,
  getAllRestaurantsController,
  getSingleRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

// Routes
// Create / Add new Restaurant || POST
router.post("/create", authMiddleware, createRestaurantController);

// Get all Resturants || GET
router.get("/getAll", getAllRestaurantsController);

// Get the single Restaurant || GET
router.get("/get/:id",getSingleRestaurantController);
module.exports = router;

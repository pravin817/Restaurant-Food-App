const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodsByRestaurantController,
} = require("../controllers/foodController");

const router = express.Router();

// Create the Food || POST
router.post("/create", authMiddleware, createFoodController);

// Get all the foods || GET
router.get("/getAll", getAllFoodController);

// Get a single food || GET
router.get("/get/:id", getSingleFoodController);

// Get Food by the restaurant || GET
router.get("/getByRestaurant/:id", getFoodsByRestaurantController);

module.exports = router;

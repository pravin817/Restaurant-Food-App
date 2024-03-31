const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodsByRestaurantController,
  updateFoodController,
  deleteFoodController,
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

// Update the food || PUT
router.put("/update/:id", authMiddleware, updateFoodController);

// Delete the food || DELETE
router.delete("/delete/:id", authMiddleware, deleteFoodController);

module.exports = router;

const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCatController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require("../controllers/categoryController");

const router = express.Router();

// Create the Category || POST
router.post("/create", authMiddleware, createCatController);

// Get all the categories || GET
router.get("/getAll", getAllCategoryController);

// Update the category || PUT
router.put("/update/:id", authMiddleware, updateCategoryController);

// Delete the category || DELETE
router.delete("/delete/:id", authMiddleware, deleteCategoryController);

module.exports = router;

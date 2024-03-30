const Food = require("../models/foodModel");

// Add food || POST
const createFoodController = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    } = req.body;

    if (!name || !description || !price || !restaurant) {
      return res.status(400).send({
        message: "Please provide all the required fields",
        success: false,
      });
    }

    const newFood = new Food({
      name,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
      ratingCount,
    });

    // save
    await newFood.save();

    res.status(201).send({
      message: "New food added successfully",
      success: true,
      food: newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while adding the food",
      success: false,
      error,
    });
  }
};

module.exports = {
  createFoodController,
};

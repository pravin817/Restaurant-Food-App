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

// Get All food || GET
const getAllFoodController = async (req, res) => {
  try {
    const allFoods = await Food.find();

    if (allFoods.length === 0) {
      return res.status(404).send({
        message: "No food found",
        success: false,
      });
    }

    res.status(200).send({
      message: "All foods feteched successfully",
      success: true,
      foods: allFoods,
      totalCount: allFoods.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while fetching the all foods",
      success: false,
      error,
    });
  }
};

// Get single Food || GET
const getSingleFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;

    if (!foodId) {
      return res.status(400).send({
        message: "Please provide the food ID",
        success: false,
      });
    }

    const food = await Food.findById({ _id: foodId });

    if (!food) {
      return res.status(404).send({
        message: "No food found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Food fetched successfully",
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while fetching the single food",
      success: false,
      error,
    });
  }
};

// Get Food by the restaurant || GET
const getFoodsByRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(400).send({
        message: "Please provide the restaurant ID",
        success: false,
      });
    }

    const food = await Food.find({ restaurant: restaurantId });
    if (!food) {
      return res.status(404).send({
        message: "No food found for this restaurant",
        success: false,
      });
    }

    res.status(200).send({
      message: "Foods fetched successfully",
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while fetching the foods by restaurant",
      success: false,
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodController,
  getSingleFoodController,
  getFoodsByRestaurantController,
};

const Restaurant = require("../models/restaurantModel");

// Create / Add new Restaurant || POST
const createRestaurantController = async (req, res) => {
  try {
    const {
      name,
      imageUrl,
      foods,
      timing,
      pickUp,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coordinates,
    } = req.body;

    // validate the Restaurant data

    if (
      !name ||
      !imageUrl ||
      !foods ||
      !timing ||
      !pickUp ||
      !delivery ||
      !isOpen ||
      !logoUrl ||
      !rating ||
      !ratingCount ||
      !code ||
      !coordinates
    ) {
      return res.status(400).send({
        message: "Please fill all the fields",
        success: false,
      });
    }

    const newRestaurant = new Restaurant({
      name,
      imageUrl,
      foods,
      timing,
      pickUp,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coordinates,
    });

    // save the restaurant
    await newRestaurant.save();

    res.status(201).send({
      message: "New restaurant created successfully.",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while creating the restaurant",
      success: false,
      error,
    });
  }
};

// Get Restaurant || GET
const getAllRestaurantsController = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});

    // console.log(restaurants);

    if (restaurants.length === 0) {
      return res.status(404).send({
        message: "No restaurant found",
        success: false,
      });
    }

    // Return the all restaurants
    res.status(200).send({
      message: "All restaurants",
      success: true,
      restaurants,
      totalCount: restaurants.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while getting the all restaurants",
      success: false,
      error,
    });
  }
};

// Get Single Restaurant || GET
const getSingleRestaurantController = async (req, res) => {
  try {
    // get the single Restaurant id
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({
        message: "Please provide the restaurant id",
        success: false,
      });
    }

    const restaurant = await Restaurant.findById(id);

    if (!restaurant) {
      return res.status(404).send({
        message: "No restaurant found",
        success: false,
      });
    }

    // Return the single restaurant
    res.status(200).send({
      message: "Restaurant found successfully",
      success: true,
      restaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while getting the single restaurant",
      success: false,
      error,
    });
  }
};

// Delete Single Restaurant || DELETE
const deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    if (!restaurantId) {
      return res.status(400).send({
        message: "Please provide the restaurant id",
        success: false,
      });
    }

    const restaurant = await Restaurant.findByIdAndDelete(restaurantId);

    if (!restaurant) {
      return res.status(404).send({
        message: "No restaurant found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Restaurant deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while deleting the restaurant",
      success: false,
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getAllRestaurantsController,
  getSingleRestaurantController,
  deleteRestaurantController,
};

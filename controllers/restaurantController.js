const Restaurant = require("../models/restaurantModel");

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
      message: "Restaurant created successfully.",
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

module.exports = {
  createRestaurantController,
};

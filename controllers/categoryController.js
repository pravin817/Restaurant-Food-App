const Category = require("../models/categoryModel");

// Create the category Controller || POST
const createCatController = async (req, res) => {
  try {
    const { name, imageUrl } = req.body;

    if (!name) {
      return res.status(400).send({
        message: "Category name is required",
        success: false,
      });
    }

    const newCategory = new Category({
      name,
      imageUrl,
    });

    // save
    await newCategory.save();

    res.status(201).send({
      message: "New category created successfully",
      success: true,
      category: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while creating the category",
      success: false,
      error: error,
    });
  }
};

module.exports = {
  createCatController,
};

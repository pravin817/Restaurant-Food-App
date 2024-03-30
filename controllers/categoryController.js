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

// Get all the categories || GET
const getAllCategoryController = async (req, res) => {
  try {
    const categories = await Category.find({});

    if (categories.length === 0) {
      return res.status(404).send({
        message: "No categories found",
        success: false,
      });
    }

    res.status(200).send({
      message: "All categories fetched successfully",
      success: true,
      categories: categories,
      totalCount: categories.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while fetching the categories",
      success: false,
      error: error,
    });
  }
};

// Update the category || PUT
const updateCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, imageUrl } = req.body;

    if (!categoryId) {
      return res.status(400).send({
        message: "Category ID is required",
        success: false,
      });
    }

    if (!name) {
      return res.status(400).send({
        message: "Updated category name is required",
        success: false,
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      { _id: categoryId },
      { name, imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({
        message: "Category not found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Category updated successfully",
      success: true,
      category: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while updating the category",
      success: false,
      error,
    });
  }
};

// Delete the category || DELETE

const deleteCategoryController = async (req, res) => {
  try {
    const categoryId = req.params.id;

    if (!categoryId) {
      return res.status(400).send({
        message: "Category ID is required",
        success: false,
      });
    }

    // Check if the category exists
    const category = await Category.findById({ _id: categoryId });

    if (!category) {
      return res.status(404).send({
        message: "Category not found",
        success: false,
      });
    }

    // delete the category
    const deletedCategory = await Category.findByIdAndDelete({
      _id: categoryId,
    });

    res.status(200).send({
      message: "Category deleted successfully",
      success: true,
      category: deletedCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while deleting the category",
      success: false,
      error,
    });
  }
};


module.exports = {
  createCatController,
  getAllCategoryController,
  updateCategoryController,
  deleteCategoryController,
};

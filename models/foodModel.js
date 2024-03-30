const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Food name is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Food Price is required"],
    },
    imageUrl: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1512152272829-e3139592d56f?q=80&w=1000&auto=format&fit=crop",
    },
    foodTags: {
      type: String,
    },
    category: {
      type: String,
    },
    code: {
      type: String,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
    },
    ratingCount: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Food = mongoose.model("Food", FoodSchema);

module.exports = Food;

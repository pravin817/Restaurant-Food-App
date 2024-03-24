const mongoose = require("mongoose");

const ResturantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Resturant name is required"],
  },
  imageUrl: {
    type: String,
    default: "",
  },
  foods: {
    type: Array,
  },
  timing: {
    type: String,
  },
  pickUp: {
    type: Boolean,
    default: true,
  },
  delivery: {
    type: Boolean,
    default: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  logoUrl: {
    type: String,
    default: "",
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
  code: {
    type: String,
  },
  coordinates: {
    id: { type: String },
    latitude: { type: Number },
    latitudeDelta: { type: Number },
    longitude: { type: Number },
    longitudeDelta: { type: Number },
    title: { type: String },
    address: { type: String },
  },
});

const Resturant = mongoose.model("Resturant", ResturantSchema);

module.exports = Resturant;

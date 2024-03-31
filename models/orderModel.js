const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    foods: [
      {
        type: mongoose.Schema.Types.ObjectID,
        ref: "Food",
        required: true,
      },
    ],

    payments: {},
    buyer: {
      type: mongoose.Schema.Types.ObjectID,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["preparing", "prepare", "on the way", "deliverd"],
      default: "preparing",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;

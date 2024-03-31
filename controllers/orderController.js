// Place Order Controller
const Order = require("../models/orderModel");

const placeOrderController = async (req, res) => {
  try {
    const { cart, payment } = req.body;
    let total = 0;

    if (!cart) {
      return res.status(400).send({
        message: "Please provide food cart details",
        success: false,
      });
    }

    cart.map((item) => {
      total += item.price;
    });

    const newOrder = new Order({
      foods: cart,
      payments: total,
      buyer: req.body.id,
    });

    // save
    await newOrder.save();

    res.status(201).send({
      message: "Order placed successfully",
      success: true,
      order: newOrder,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      message: "Error while placing the order",
      success: false,
      error,
    });
  }
};

module.exports = { placeOrderController };

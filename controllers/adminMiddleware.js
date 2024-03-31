const Order = require("../models/orderModel");
const User = require("../models/userModel");

const orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    if(!status || !orderId) {
        return res.status(400).send({
            message: "Please provide order status and order id",
            success: false,
        });
    }
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).send({
        message: "Order not found",
        success: false,
      });
    }

    res.status(200).send({
      message: "Order status updated successfully",
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while updating the order status",
      success: false,
      error,
    });
  }
};

module.exports = {
  orderStatusController,
};

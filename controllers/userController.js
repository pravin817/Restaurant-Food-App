const User = require("../models/userModel");

// Get user controller
const getUserController = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    console.log("body ", req.body);

    const user = await User.findById({ _id: id });

    if (!user) {
      res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    // hide the password
    user.password = undefined;
    res.status(200).send({
      message: "User data get successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while getting the user details",
      success: false,
      error,
    });
  }
};

// Update user profile controller
const updateUserController = async (req, res) => {
  try {
    // find the user based on the id
    const { id } = req.body;

    const user = await User.findById({ _id: id });
    if (!user) {
      res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    // update the user details

    const { username, address, phone } = req.body;

    if (username) {
      user.username = username;
    }

    if (address) {
      user.address = address;
    }

    if (phone) {
      user.phone = phone;
    }

    // save the updated user details
    await user.save();
    res.status(200).send({
      message: "User updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error occurs while updating the user details",
      success: false,
      error,
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
};

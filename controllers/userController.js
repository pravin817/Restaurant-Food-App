const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

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

//Update User password controller
const updatePasswordController = async (req, res) => {
  try {
    // get the user id, oldpassowrd and new password
    const { id, oldPassword, newPassword } = req.body;

    // find the user based on the id
    const user = await User.findById({ _id: id });

    // if we don't get the user
    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    // validate the oldPassword and newPassword
    if (!oldPassword || !newPassword) {
      return res.status(400).send({
        message: "Please provide the old password and new password",
        success: false,
      });
    }
    const isMatched = await bcrypt.compare(oldPassword, user.password);

    if (!isMatched) {
      return res.status(400).send({
        message: "Invalid old password",
        success: false,
      });
    }

    // hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;

    // save the user
    await user.save();

    res.status(200).send({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error occurs while updating the user password",
      success: false,
      error,
    });
  }
};
module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
};

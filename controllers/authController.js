const User = require("../models/userModel");

const registerController = async (req, res) => {
  try {
    // extract the data from the request
    const { username, email, password, phone } = req.body;
    console.log(req.body);

    // validate the input fields
    if (!username || !email || !password || !phone) {
      return res.status(500).send({
        message: "Please provide all fields",
        status: false,
      });
    }

    // if user already exists
    const isExistingUser = await User.findOne({ email });

    if (isExistingUser) {
      return res.status(500).send({
        message: "User already exists, please login",
        status: false,
      });
    }

    // create the new user
    const newUser = await User.create({
      username,
      email,
      password,
      phone,
    });

    // send the response
    res.status(201).send({
      message: "User registered successfully",
      status: true,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while registering the user",
      status: false,
      error,
    });
  }
};

module.exports = {
  registerController,
};

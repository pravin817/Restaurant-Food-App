const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRound = 10;

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

    // get the password and hashed It before string iun DB
    const salt = await bcrypt.genSalt(saltRound);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
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

// User Login || POST
const loginController = async (req, res) => {
  try {
    // get email and password from the body
    const { email, password } = req.body;

    // validate the input fields
    if (!email || !password) {
      return res.status(500).send({
        message: "Please provide email and password",
        status: false,
      });
    }

    // check if the email is registred
    const isEmailRegistered = await User.find({ email });
    console.log("User details : ", isEmailRegistered);

    if (isEmailRegistered.length === 0) {
      return res.status(404).send({
        message: "User not registered",
        status: false,
      });
    }

    // Now check the email and password in the database
    const user = await User.findOne({ email });
    // console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        message: "Invalid email or password",
        status: false,
      });
    }

    // generate the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // If all goes well, send the response
    // hide the password
    user.password = undefined;
    res.status(200).send({
      message: "User login successfully",
      status: true,
      user: user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error while login the user",
      status: false,
      error,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};

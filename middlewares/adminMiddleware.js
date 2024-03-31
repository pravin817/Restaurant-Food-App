const User = require("../models/userModel");

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id);

    if (!user) {
      return res.status(404).send({
        message: "User not found",
        success: false,
      });
    }

    if (user.userType !== "admin") {
      return res.status(401).send({
        message: "Only admin access allowed!",
        success: false,
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "An-authorised access!",
      success: false,
      error,
    });
  }
};

module.exports = adminMiddleware;

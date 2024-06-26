const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");

const router = express.Router();

// Register User || POST
router.post("/register", registerController);

// Login user || POST
router.post("/login", loginController);

module.exports = router;

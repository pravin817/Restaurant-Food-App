const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Routes
// GET User || GET
router.get("/getUser", authMiddleware, getUserController);

//UPDATE User Profile || PUT
router.put("/updateUser", authMiddleware, updateUserController);

// UPDATE user Password || PUT
router.put("/updatePassword", authMiddleware, updatePasswordController);

module.exports = router;

const express = require("express");
const {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
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

// Reset password ||POST
router.post("/resetPassword", authMiddleware, resetPasswordController);

// Delete the User Account || DELETE
router.delete("/deleteUser/:id",authMiddleware,deleteProfileController)

module.exports = router;

const express = require("express");
const { getUserController, updateUserController } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Routes
// GET User || GET
router.get("/getUser", authMiddleware, getUserController);

//UPDATE User Profile || PUT
router.put("/updateUser", authMiddleware, updateUserController);

module.exports = router;

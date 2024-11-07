const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  getMe,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Protected route to get all users
router.get("/", protect, getAllUsers);

// Protected route to get specific user
router.get("/:id", protect, getUserById);

router.get("/me", protect, getMe);
module.exports = router;

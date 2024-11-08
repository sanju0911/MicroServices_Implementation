const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  getme,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/", protect, getAllUsers);
router.get("/:id", protect, getUserById);
router.get("/me", protect, getme);

module.exports = router;

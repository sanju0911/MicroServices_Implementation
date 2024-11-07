const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    const token = user.generateToken();
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = user.generateToken();
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("blogs");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get specific user by ID
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate("blogs");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getme = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { registerUser, loginUser, getAllUsers, getUserById, getMe };

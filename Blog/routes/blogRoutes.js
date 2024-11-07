const express = require("express");
const router = express.Router();
const {
  createBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");
const protect = require("../middleware/authMiddleware");

// Create a new blog
router.post("/", protect, createBlog);

// Update an existing blog
router.put("/:id", protect, updateBlog);

// Delete a blog
router.delete("/:id", protect, deleteBlog);

module.exports = router;

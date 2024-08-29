const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    default: 1,
    increment: true,
  },
  userId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;

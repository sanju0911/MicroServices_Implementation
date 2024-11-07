const axios = require("axios");
const Blog = require("../models/blogModel");

// Create a new blog
const createBlog = async (req, res) => {
  const { title, content } = req.body;
  const userToken = req.header("x-auth-token");

  try {
    // Verify the user by calling the User Service API
    const userResponse = await axios.get("http://localhost:5000/api/users/me", {
      headers: { "x-auth-token": userToken },
    });
    const userId = userResponse.data._id;

    const newBlog = new Blog({
      title,
      content,
      user: userId,
    });

    await newBlog.save();

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a blog
const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userToken = req.header("x-auth-token");

  try {
    // Verify the user by calling the User Service API
    const userResponse = await axios.get("http://localhost:5000/api/users/me", {
      headers: { "x-auth-token": userToken },
    });
    const userId = userResponse.data._id;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the user is the owner of the blog
    if (blog.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const userToken = req.header("x-auth-token");

  try {
    // Verify the user by calling the User Service API
    const userResponse = await axios.get("http://localhost:5000/api/users/me", {
      headers: { "x-auth-token": userToken },
    });
    const userId = userResponse.data._id;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Check if the user is the owner of the blog
    if (blog.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await blog.remove();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createBlog, updateBlog, deleteBlog };

const Blog = require("../models/Model");
const axios = require("axios");

class BlogController {
  static async store(req, res) {
    try {
      const { userId, content } = req.body;

      if (!userId || !content) {
        return res
          .status(400)
          .json({ message: "UserId and content are required" });
      }

      const newBlog = new Blog({
        userId,
        content,
      });

      const savedBlog = await newBlog.save();

      return res.status(201).json({
        message: "Blog created successfully",
        blog: savedBlog,
      });
    } catch (error) {
      console.log("Error creating blog:", error);
      return res
        .status(500)
        .json({ message: "Error creating blog", error: error.message });
    }
  }

  static async getBlogs(req, res) {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });

      if (!blogs || blogs.length === 0) {
        return res.status(404).json({ message: "No blogs found" });
      }

      return res.json({ blogs });
    } catch (error) {
      console.log("Error fetching blogs:", error);
      return res
        .status(500)
        .json({ message: "Error fetching blogs", error: error.message });
    }
  }
}

module.exports = BlogController;

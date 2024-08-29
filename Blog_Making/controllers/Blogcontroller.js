const Blog = require("../models/Model");
const axios = require("axios");

class BlogController {
  static async index(req, res) {
    try {
      // Fetch all blogs
      const blogs = await Blog.find().sort({ createdAt: -1 });

      // Collect user IDs
      let userIds = [];
      blogs.forEach((blog) => {
        userIds.push(blog.userId);
      });

      // Fetch users based on the collected user IDs
      const response = await axios.post(`https://localhost:3000/getalluser`, {
        ids: userIds,
      });

      const users = {};
      response.data.users.forEach((user) => {
        users[user.id] = user;
      });

      // Map blogs with corresponding user information
      let BlogWithUsers = await Promise.all(
        blogs.map((blog) => {
          const user = users[blog.userId];
          return {
            ...blog.toObject(), // Use toObject() to avoid issues with Mongoose documents
            user,
          };
        })
      );

      return res.json({ BlogWithUsers });
    } catch (error) {
      console.log("The blog fetch error is", error);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }

  static async store(req, res) {
    try {
      const { userId, content } = req.body;

      if (!userId || !content) {
        return res
          .status(400)
          .json({ message: "UserId and content are required" });
      }

      // Create a new blog
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
}

module.exports = BlogController;

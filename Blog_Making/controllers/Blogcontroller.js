const Blog = require("../models/Model");
const axios = require("axios");

class BlogController {
  static async index(req, res) {
    try {
      const blogs = await Blog.find();

      const userIds = blogs.map((blog) => blog.userId);

      const response = await axios.post("http://localhost:3000/getuser", {
        userIds,
      });

      const userDetails = response.data;

      const completeUserData = await blogs
        .map((blog) => {
          const userDetail = userDetails.find(
            (user) => user.id === blog.userId
          );
          if (userDetail) {
            return {
              blog,
              userDetail,
            };
          }
        })
        .filter((data) => data !== undefined);

      return res.json({ completeUserData });
    } catch (error) {
      console.log("Error fetching blogs:", error);
      return res
        .status(500)
        .json({ message: "Error fetching blogs", error: error.message });
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

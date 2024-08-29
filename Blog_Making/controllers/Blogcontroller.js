const Blog = require("../models/Model");

exports.createBlog = async (req, res) => {
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

    res.status(201).json({
      message: "Blog created successfully",
      blog: savedBlog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating blog",
      error: error.message,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Use blog routes
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

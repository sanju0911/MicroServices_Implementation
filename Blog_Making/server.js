const express = require("express");
const db = require("./config/db");
const blog_routes = require("./routes/Blog_routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("blog world");
});

app.use(blog_routes);

app.listen(5000, () => {
  console.log("server started");
});

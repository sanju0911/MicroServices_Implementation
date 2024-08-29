const express = require("express");

const db = require("./config/db_config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  res.send("hello world");
});

app.listen(3000, () => {
  console.log("server started");
});

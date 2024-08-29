const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const dbURI = process.env.Database_URL;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB successfully");
});

module.exports = mongoose;

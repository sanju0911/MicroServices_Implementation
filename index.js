const express = require("express");

const db = require("./config/db_config");
const user_routes = require("./routes/UserRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", user_routes);

app.listen(3000, () => {
  console.log("server started");
});

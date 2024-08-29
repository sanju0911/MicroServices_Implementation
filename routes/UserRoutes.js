const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserControllers");

// User registration route
router.post("/register", userController.registerUser);

router.get("/login", userController.loginUser);

module.exports = router;

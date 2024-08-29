const express = require("express");
const router = express.Router();
const userController = require("../controllers/UserControllers");
const AuthControllers = require("../controllers/AuthControllers");
const Authorizationfile = require("../Auth/Auth");

// User registration route
router.post("/register", userController.registerUser);

router.get("/login", userController.loginUser);

router.get("/getuser", Authorizationfile.verifyToken, AuthControllers.getUser);

router.get(
  "/getalluser",
  Authorizationfile.verifyToken,
  AuthControllers.getAllUsers
);
module.exports = router;
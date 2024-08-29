const User = require("../models/User_Schema");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};

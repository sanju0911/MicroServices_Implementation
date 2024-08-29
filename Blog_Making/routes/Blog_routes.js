const express = require("express");

const router = express.Router();

const blogcontroller = require("../controllers/Blogcontroller");

router.post("/addblog", blogcontroller.createBlog);


module.exports = router;
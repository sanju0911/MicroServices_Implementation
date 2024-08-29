const express = require("express");

const router = express.Router();

const blogcontroller = require("../controllers/Blogcontroller");

router.post("/create", blogcontroller.store);
router.get("/blogs", blogcontroller.index);
router.get("/getblogs", blogcontroller.getBlogs);

module.exports = router;

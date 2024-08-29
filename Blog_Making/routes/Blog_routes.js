const express = require("express");

const router = express.Router();

const blogcontroller = require("../controllers/Blogcontroller");

router.post("/create", blogcontroller.store);
router.get("/blogs", blogcontroller.index);

module.exports = router;

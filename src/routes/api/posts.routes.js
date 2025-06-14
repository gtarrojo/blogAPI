const router = require("express").Router();
const postsController = require("../../controller/posts.controller");

router.get("/", postsController.getAll);

module.exports = router;

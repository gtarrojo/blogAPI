const router = require("express").Router();
const postsController = require("../../controller/posts.controller");

router.get("/", postsController.getAll);
router.get("/:postId", postsController.getById);

module.exports = router;

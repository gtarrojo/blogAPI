const router = require("express").Router();
const postsController = require("../../controller/posts.controller");

router.get("/", postsController.getAll);
router.get("/:postId", postsController.getById);

router.post("/", postsController.create);

module.exports = router;

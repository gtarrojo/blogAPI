const router = require("express").Router();
const postsController = require("../../controller/posts.controller");
const {
  checkEmailExists,
  authorExistsByEmail,
} = require("../../middlewares/author.middleware");

router.get("/", postsController.getAll);
router.get("/:postId", postsController.getById);

router.post("/", authorExistsByEmail, postsController.create);

module.exports = router;

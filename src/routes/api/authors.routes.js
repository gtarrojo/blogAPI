const router = require("express").Router();
const authorsController = require("../../controller/authors.controller");
const { checkEmailExists } = require("../../middlewares/author.middleware");

router.get("/", authorsController.getAll);
router.get("/:authorId", authorsController.getById);

router.post("/", checkEmailExists, authorsController.create);

module.exports = router;

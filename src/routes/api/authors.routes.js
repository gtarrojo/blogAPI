const router = require("express").Router();
const authorsController = require("../../controller/authors.controller");

router.get("/", authorsController.getAll);
router.get("/:authorId", authorsController.getById);

router.post("/", authorsController.create);

module.exports = router;

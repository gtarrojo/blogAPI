const router = require("express").Router();
const authorsController = require("../../controller/authors.controller");

router.get("/", authorsController.getAll);

module.exports = router;

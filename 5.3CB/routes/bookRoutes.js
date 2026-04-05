const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");

router.get("/", controller.getAllBooks);
router.get("/:id", controller.getBookById);

module.exports = router;
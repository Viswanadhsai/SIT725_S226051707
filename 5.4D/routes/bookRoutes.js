const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");

// URL mapping only. No business logic here.
router.get("/", controller.getBooks);
router.get("/:id", controller.getBook);
router.post("/", controller.createBook);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.deleteBook);

module.exports = router;

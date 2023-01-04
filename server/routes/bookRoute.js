const express = require("express");
const router = express.Router();

const {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

router.get("/books", getAllBooks);
router.post("/books/new", createBook);
router.delete("/books/delete/:id", deleteBook);
router.put("/books/update/:id", updateBook);

module.exports = router;
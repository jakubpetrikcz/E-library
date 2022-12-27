const express = require("express");
const router = express.Router();

const {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

router.get("/books", getAllBooks);
router.post("/book/new", createBook);
router.delete("/book/delete/:id", deleteBook);
router.put("/book/update/:id", updateBook);

module.exports = router;
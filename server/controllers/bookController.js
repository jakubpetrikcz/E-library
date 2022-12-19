const data = require("../data/data.json");

const BookController = require("../models/book");

const insertBooks = async (books) => {
    try {
        const numBooks = await BookController.countDocuments();

        if (numBooks === 0) {

            const insertPromises = books.map(book => BookController.insertMany(book));

            await Promise.all(insertPromises);

            console.log("Successfully saved all books.");
        } else {
            console.log("Books collection is not empty, not inserting books.");
        }
    } catch (err) {
        console.log("Error saving books: ", err);
    }
}

insertBooks(data.books);


const getAllBooks = async (req, res) => {
    const query = {};

    if (req.query.bookName) {
        query.bookName = {$regex: req.query.bookName, $options: "i"};
    }

    if (req.query.authorName) {
        query.authorName = {$regex: req.query.authorName, $options: "i"};
    }

    if (req.query.releaseYear) {
        query.releaseYear = Number(req.query.releaseYear);
    }

    if (Object.keys(req.query).length === 0) {
        const books = await BookController.find();
        res.json(books);
    } else {
        const books = await BookController.find(query);
        res.json(books);
    }
};

const createBook = async (req, res) => {
    const book = new BookController(req.body);

    book.save()
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));

    res.json(book);
};

const deleteBook = async (req, res) => {
    const result = await BookController.findByIdAndDelete(req.params.id);

    res.json(result);
};

const updateBook = async (req, res) => {
    const result = await BookController.findByIdAndUpdate({ _id: req.params.id }, req.body);

    res.json(result);
};

module.exports = {
    getAllBooks,
    createBook,
    deleteBook,
    updateBook
}


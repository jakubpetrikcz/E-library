const data = require("../data/data.json");

const Book = require("../models/book");

const insertBooks = async (books) => {
    try {
        const numBooks = await Book.countDocuments();

        if (numBooks === 0) {

            const insertPromises = books.map(book => Book.insertMany(book));

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
        const books = await Book.find();
        res.json(books);
    } else {
        const books = await Book.find(query);
        res.json(books);
    }
};

const createBook = async (req, res) => {
    const book = new Book(req.body);

    book.save()
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));

    res.json(book);
};

const deleteBook = async (req, res) => {
    const result = await Book.findByIdAndDelete(req.params.id);

    res.json(result);
};

const updateBook = async (req, res) => {
    const result = await Book.findByIdAndUpdate(
        {_id: req.params.id},
        {
            bookName: req.body.bookName,
            authorName: req.body.authorName,
            pages: req.body.pages,
            releaseYear: req.body.releaseYear,
            amount: req.body.amount,
        }
    );

    res.json(result);
};

module.exports = {
    getAllBooks,
    createBook,
    deleteBook,
    updateBook
}


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const books = require("./Data/books.json");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(
        "mongodb://rootuser:rootpass@localhost:27017/mongodb-project?&authSource=admin",
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connected to DB"))
    .catch(console.error);

const Book = require("./models/Book");

books.forEach(function (n, i) {
    Book.insertMany(n, function (err, doc) {
        // if (err) return console.log(500, { error: err });
        return console.log("Succesfully saved.");
    });
});

app.get("/books", async (req, res) => {
    const books = await Book.find();

    res.json(books);
});

app.post("/book/new", async (req, res) => {
    const book = new Book(req.body);

    book.save()
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));

    res.json(book);
});

app.delete("/book/delete/:id", async (req, res) => {
    const result = await Book.findByIdAndDelete(req.params.id);

    res.json(result);
});

app.put("/book/update/:id", async (req, res) => {
    Book.findByIdAndUpdate(
        { _id: req.params.id },
        {
            bookName: req.body.bookName,
            authorName: req.body.authorName,
            pages: req.body.pages,
            releaseYear: req.body.releaseYear,
            amount: req.body.amount,
        }
    )
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));
    // .then((doc) => console.log(doc))
    // .catch((err) => console.log(err));
    // const result = await Book.findByIdAndUpdate(req.params.id);

    // res.json(result);
    // console.log("req.body", req.body);
    // var _id = req.body._id;
    // const book = {
    //     bookName: req.body.bookName,
    //     authorName: req.body.authorName,
    //     pages: req.body.pages,
    //     releaseYear: req.body.releaseYear,
    //     amount: req.body.amount,
    // };

    // Book.findByIdAndUpdate(_id, book, { new: true }, function(
    //     err,
    //     book
    //   ) {
    //     if (err) {
    //       console.log("err", err);
    //       res.status(500).send(err);
    //     } else {
    //       console.log("success");
    //       res.send(book);
    //     }
    //   });
});

app.get("/book/complete/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);

    book.complete = !book.complete;

    book.save();

    res.json(book);
});

app.listen(3001, () => console.log("Server started on port 3001"));

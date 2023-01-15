const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema(
    {
        bookName: {
            type: String,
            // required: true,
            unique: true,
        },
        authorName: {
            type: String,
            // required: true,
        },
        pages: {
            type: Number,
            // required: true,
        },
        releaseYear: {
            type: Number,
            // required: true,
        },
        image: {
            type: String,
            // requierd: true,
        },
        amount: {
            type: Number,
            // required: true,
        },
        borrowedDate: {
            type: Date,
        }
    },
    {versionKey: false}
);

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;

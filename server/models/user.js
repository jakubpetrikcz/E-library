const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
        },
        surname: {
            type: String,
        },
        birthNumber: {
            type: String,
        },
        username: {
            type: String,
            unique: true,
        },
        password: {
            type: String,
        },
        borrowedBooks: [{
            type: Object,
            ref: "Book"
        }]
    },
    {versionKey: false}
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
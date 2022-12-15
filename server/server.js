const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const data = require("./data/data.json");
const {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook
} = require('./controllers/book');

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

const User = require("./models/user");

const insertUsers = async (users) => {
    try {
        const numUsers = await User.countDocuments();

        if (numUsers === 0) {

            const insertPromises = users.map(user => User.insertMany(user));

            await Promise.all(insertPromises);

            console.log("Successfully saved all users.");
        }
        else {
            console.log("Users collection is not empty, not inserting users.");
        }
    } catch (err) {
        console.log("Error saving users: ", err);
    }
}

insertUsers(data.users);

app.get("/books", getAllBooks);
app.post("/book/new", createBook);
app.delete("/book/delete/:id", deleteBook);
app.put("/book/update/:id", updateBook);


app.listen(3001, () => console.log("Server started on port 3001"));

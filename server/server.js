const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {
    createBook,
    getAllBooks,
    updateBook,
    deleteBook
} = require('./controllers/bookController');
const {getAllUsers, createUser, deleteUser, updateUser, findUserToLogin, userData, addBookToBorrowedList,
    removeBookFromBorrowedList
} = require("./controllers/userController");


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

app.get("/books", getAllBooks);
app.post("/book/new", createBook);
app.delete("/book/delete/:id", deleteBook);
app.put("/book/update/:id", updateBook);


app.get("/users", getAllUsers);
app.post("/user/new", createUser);
app.delete("/user/delete/:id", deleteUser);
app.put("/user/update/:id", updateUser);

app.post("/user/login", findUserToLogin);
app.post("/userData", userData);
app.put("/borrowBook", addBookToBorrowedList);
app.put("/borrowBook/:id", removeBookFromBorrowedList);

// app.post("/register", (req, res) => {
//     console.log(req.body);
//     res.json({status: "ok"});
// })


app.listen(3001, () => console.log("Server started on port 3001"));

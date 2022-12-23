const data = require("../data/data.json");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const UserController = require("../models/user");

const insertUsers = async (users) => {
    try {
        const numUsers = await UserController.countDocuments();

        if (numUsers === 0) {

            const insertPromises = users.map(user => UserController.insertMany(user));

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

const getAllUsers = async (req, res) => {
    // const query = {};
    //
    // if (req.query.bookName) {
    //     query.bookName = {$regex: req.query.bookName, $options: "i"};
    // }
    //
    // if (req.query.authorName) {
    //     query.authorName = {$regex: req.query.authorName, $options: "i"};
    // }
    //
    // if (req.query.releaseYear) {
    //     query.releaseYear = Number(req.query.releaseYear);
    // }

    if (Object.keys(req.query).length === 0) {
        const users = await UserController.find();
        res.json(users);
    } else {
        const users = await UserController.find(query);
        res.json(users);
    }
};

const createUser = async (req, res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10);
        await UserController.create({
            name: req.body.name,
            surname: req.body.surname,
            birthNumber: req.body.birthNumber,
            username: req.body.username,
            password: newPassword,
        })
    } catch (err) {
        console.log(err)
    }
};

const deleteUser = async (req, res) => {
    const result = await UserController.findByIdAndDelete(req.params.id);

    res.json(result);
};

const updateUser = async (req, res) => {
    const result = await UserController.findByIdAndUpdate({ _id: req.params.id }, req.body);

    res.json(result);
};

const findUserToLogin = async (req, res) => {
    const user = await UserController.findOne({
        username: req.body.username,
    })

    if (!user) {
        return {status: "error", error: "Invalid login"}
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
        const token = jwt.sign({
            name: user.name,
            surname: user.surname,
            username: user.username,
        }, "secret123")
        return res.json({status: "ok", user: token})
    } else {
        return res.json({status: "error", user: false})
    }
}

const userData = async (req, res) => {
    const { token } = req.body;

    try {
        const user = jwt.verify(token, "secret123");
        // console.log(user);

        const username = user.username;
        UserController.findOne({ username: username })
            .then((data) => {
                res.send({ status: "ok", data: data });
            })
            .catch((error) => {
                res.send({ status: "error", data: error });
            });
    } catch (error) {}
}


const addBookToBorrowedList = async (req, res) => {
    try {
        const { userId, book } = req.body;

        console.log(book);

        // Update the user document to add the borrowed book
        const user = await UserController.findByIdAndUpdate(userId, {
            $push: { borrowedBooks: book }
        }, { new: true });

        // Return the updated user document
        res.send({ user });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    findUserToLogin,
    userData,
    addBookToBorrowedList,
}
const data = require("../data/data.json");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/createError");
const cron = require("node-cron");

const UserController = require("../models/user");
const BookController = require("../models/book");

const insertUsers = async (users) => {
    try {
        const numUsers = await UserController.countDocuments();

        if (numUsers === 0) {
            const insertPromises = users.map((user) =>
                UserController.insertMany(user)
            );

            await Promise.all(insertPromises);

            console.log("Successfully saved all users.");
        } else {
            console.log("Users collection is not empty, not inserting users.");
        }
    } catch (err) {
        console.log("Error saving users: ", err);
    }
};

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
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        // const newPassword = await bcrypt.hash(req.body.password, 10);
        await UserController.create({
            name: req.body.name,
            surname: req.body.surname,
            birthNumber: req.body.birthNumber,
            username: req.body.username,
            password: hashedPassword,
        });
    } catch (err) {
        console.log(err);
    }
};

const deleteUser = async (req, res) => {
    const result = await UserController.findByIdAndDelete(req.params.id);

    res.json(result);
};

const updateUser = async (req, res) => {
    const result = await UserController.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
    );

    res.json(result);
};

const findUserToLogin = async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        return next(
            createError({
                message: "Email and password are required",
                statusCode: 400,
            })
        );
    }

    try {
        const user = await UserController.findOne({
            username: req.body.username,
        }).select("name surname password");
        if (!user) {
            return next(
                createError({
                    status: 404,
                    message: "User not found with the username",
                })
            );
        }
        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect) {
            return next(
                createError({ status: 400, message: "Password is incorrect" })
            );
        }
        const payload = {
            id: user._id,
            name: user.name,
        };
        const token = jwt.sign(payload, "secret123", {
            expiresIn: "1d",
        });

        res.cookie("token", token, {
            httpOnly: true,
        })
            .status(200)
            .json({
                name: user.name,
                surname: user.surname,
                message: "login success",
            });
    } catch (err) {
        return next(err);
    }
};

const userData = async (req, res, next) => {
    try {
        const data = await UserController.findById(req.user.id);
        return res.status(200).json(data);
    } catch (err) {
        return next(err);
    }
    // const token = req.cookies.access_token;

    // console.log(req);

    // try {
    //     const user = jwt.verify(token, "secret123");

    //     const userId = user.id;
    //     UserController.findOne({ _id: userId })
    //         .then((data) => {
    //             // console.log(data);
    //             res.send({ status: "ok", data: data });
    //         })
    //         .catch((error) => {
    //             res.send({ status: "error", data: error });
    //         });
    // } catch (err) {
    //     console.log(err);
    // }
};

const logout = async (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "logout success" });
};

const isLoggedIn = async (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }
    return jwt.verify(token, "secret123", (err) => {
        if (err) {
            return res.json(false);
        }
        return res.json(true);
    });
};

const addBookToBorrowedList = async (req, res) => {
    try {
        const { userId, book } = req.body;

        const update = { borrowedDate: Date.now() };
        const updatedBook = await BookController.findOneAndUpdate(
            { _id: book.id },
            update,
            { new: true }
        );
        //console.log(book);
        // Update the user document to add the borrowed book
        await UserController.findByIdAndUpdate(
            userId,
            {
                $push: { borrowedBooks: book },
            },
            { new: true }
        );

        console.log(book);
        console.log(updatedBook);

        cron.schedule("*/10 * * * * *", async function () {
            const currentDate = new Date();
            const borrowedDate = new Date(updatedBook.borrowedDate);
            console.log(
                currentDate.getTime() - borrowedDate.getTime() >= 10 * 1000
            );
            if (currentDate.getTime() - borrowedDate.getTime() >= 10 * 1000) {
                const user = await UserController.findByIdAndUpdate(
                    userId,
                    {
                        $pull: { borrowedBooks: book },
                    },
                    { new: true }
                );
                // Return the updated user document
                res.send({ user });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

const removeBookFromBorrowedList = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        // Update the user document to remove the borrowed book
        const user = await UserController.findByIdAndUpdate(
            userId,
            {
                $pull: { borrowedBooks: { id: bookId } },
            },
            { new: true }
        );

        // Return the updated user document
        res.send({ user });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
};

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser,
    findUserToLogin,
    userData,
    logout,
    isLoggedIn,
    addBookToBorrowedList,
    removeBookFromBorrowedList,
};

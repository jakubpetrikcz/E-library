const data = require("../data/data.json");

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
    const user = new UserController(req.body);

    user.save()
        .then((doc) => console.log(doc))
        .catch((err) => console.log(err));

    res.json(user);
};

const deleteUser = async (req, res) => {
    const result = await UserController.findByIdAndDelete(req.params.id);

    res.json(result);
};

const updateUser = async (req, res) => {
    const result = await UserController.findByIdAndUpdate({ _id: req.params.id }, req.body);

    res.json(result);
};

module.exports = {
    getAllUsers,
    createUser,
    deleteUser,
    updateUser
}
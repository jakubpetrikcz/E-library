const express = require("express");
const router = express.Router();

const {getAllUsers, createUser, deleteUser, updateUser, findUserToLogin, userData, addBookToBorrowedList,
    removeBookFromBorrowedList
} = require("../controllers/userController");

router.get("/users", getAllUsers);
router.post("/users/new", createUser);
router.delete("/users/delete/:id", deleteUser);
router.put("/users/update/:id", updateUser);

router.post("/user/login", findUserToLogin);
router.post("/userData", userData);
router.put("/borrowBook", addBookToBorrowedList);
router.put("/borrowBook/:id", removeBookFromBorrowedList);

module.exports = router;
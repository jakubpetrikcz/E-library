const express = require("express");
const router = express.Router();

const {getAllUsers, createUser, deleteUser, updateUser, findUserToLogin, userData, addBookToBorrowedList,
    removeBookFromBorrowedList
} = require("../controllers/userController");

router.get("/users", getAllUsers);
router.post("/user/new", createUser);
router.delete("/user/delete/:id", deleteUser);
router.put("/user/update/:id", updateUser);

router.post("/user/login", findUserToLogin);
router.post("/userData", userData);
router.put("/borrowBook", addBookToBorrowedList);
router.put("/borrowBook/:id", removeBookFromBorrowedList);

module.exports = router;
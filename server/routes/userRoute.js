const express = require("express");
const router = express.Router();
const {checkAuth} = require("../utils/checkAuth");

const {getAllUsers, createUser, deleteUser, updateUser, findUserToLogin, userData, addBookToBorrowedList,
    removeBookFromBorrowedList,
    logout,
    isLoggedIn
} = require("../controllers/userController");


router.post("/user/login", findUserToLogin);
router.get("/userData", checkAuth, userData);
router.get("/logout", logout);
router.get("/is_logged_in", isLoggedIn);

router.get("/users", getAllUsers);
router.post("/users/new", createUser);
router.delete("/users/delete/:id", deleteUser);
router.put("/users/update/:id", updateUser);


router.put("/borrowBook", addBookToBorrowedList);
router.put("/borrowBook/:id", removeBookFromBorrowedList);

module.exports = router;
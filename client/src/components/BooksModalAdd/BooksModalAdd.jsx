import React from "react";
import axios from "axios";
import { useState } from "react";
import "./BooksModalAdd.scss";

const API_BASE = "http://localhost:3001";

const BooksModalAdd = ({ path, onClickClose }) => {
    const [book, setBook] = useState({
        bookName: "",
        authorName: "",
        pages: 0,
        releaseYear: "",
        image: "",
        amount: 0,
    });
    const [user, setUser] = useState({
        name: "",
        surname: "",
        birthNumber: "",
        username: "",
        password: "",
    });

    const handleChange = (e, entityType) => {
        const { name, value } = e.target;
        if (entityType === "book") {
            setBook((prev) => {
                return {
                    ...prev,
                    [name]: value,
                };
            });
        } else if (entityType === "user") {
            setUser((prev) => {
                return {
                    ...prev,
                    [name]: value,
                };
            });
        }
    };

    const addBook = async (e, entityType) => {
        e.preventDefault();

        if (entityType === "book") {
            axios
                .post(API_BASE + `/books/new/`, book)
                .then((res) => {
                    setBook(res.data);
                })
                .catch((err) => console.log(err));
        } else if (entityType === "user") {
            axios
                .post(API_BASE + `/users/new/`, user)
                .then((res) => {
                    setUser(res.data);
                })
                .catch((err) => console.log(err));
        }

        onClickClose();
        window.location.reload();
    };

    return (
        <>
            <div className="popup">
                <div className="closePopup" onClick={onClickClose}>
                    x
                </div>
                {path === "books" ? (
                    <div className="content">
                        <h3>Add Book</h3>
                        <input
                            placeholder="title"
                            type="text"
                            className="add-todo-input"
                            name="bookName"
                            onChange={(e) => handleChange(e, "book")}
                            value={book.bookName ? book.bookName : ""}
                        />

                        <input
                            type="text"
                            className="add-todo-input"
                            name="authorName"
                            onChange={(e) => handleChange(e, "book")}
                            value={book.authorName ? book.authorName : ""}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="pages"
                            onChange={(e) => handleChange(e, "book")}
                            value={book.pages ? book.pages : 0}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="releaseYear"
                            onChange={(e) => handleChange(e, "book")}
                            value={book.releaseYear ? book.releaseYear : ""}
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            name="image"
                            onChange={(e) => handleChange(e, "book")}
                            value={book.image ? book.image : ""}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="amount"
                            onChange={(e) => handleChange(e, "book")}
                            value={book.amount ? book.amount : 0}
                        />
                        <div className="button" onClick={(e) => addBook(e, "book")}>
                            Create Book
                        </div>
                    </div>
                ) : (
                    <div className="content">
                        <h3>Add User</h3>
                        <input
                            placeholder="title"
                            type="text"
                            className="add-todo-input"
                            name="name"
                            onChange={(e) => handleChange(e, "user")}
                            value={user.name ? user.name : ""}
                        />

                        <input
                            type="text"
                            className="add-todo-input"
                            name="surname"
                            onChange={(e) => handleChange(e, "user")}
                            value={user.surname ? user.surname : ""}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="birthNumber"
                            onChange={(e) => handleChange(e, "user")}
                            value={user.birthNumber ? user.birthNumber : 0}
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            name="username"
                            onChange={(e) => handleChange(e, "user")}
                            value={user.username ? user.username : ""}
                        />
                        <div className="button" onClick={(e) => addBook(e, "user")}>
                            Create User
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default BooksModalAdd;

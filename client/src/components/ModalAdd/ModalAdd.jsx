import React from "react";
import axios from "axios";
import { useState } from "react";
import "./ModalAdd.scss";

const API_BASE = "http://localhost:3001";

const ModalAdd = ({ isAdd, onClickClose }) => {
    const [book, setBook] = useState({
        bookName: "",
        authorName: "",
        pages: 0,
        releaseYear: "",
        image: "",
        amount: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook((prev) => {
            console.log(prev);
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const addBook = async (e) => {
        e.preventDefault();

        axios
            .post(API_BASE + "/book/new/", book)
            .then((res) => {
                setBook(res.data);
            })
            .catch((err) => console.log(err));

        onClickClose();
    };

    return (
        <>
            {isAdd ? (
                <div className="popup">
                    <div className="closePopup" onClick={onClickClose}>
                        x
                    </div>
                    <div className="content">
                        <h3>Add Book</h3>
                        <input
                            type="text"
                            className="add-todo-input"
                            name="bookName"
                            onChange={handleChange}
                            value={book.bookName}
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            name="authorName"
                            onChange={handleChange}
                            value={book.authorName}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="pages"
                            onChange={handleChange}
                            value={book.pages}
                        />
                        <input
                            type="date"
                            className="add-todo-input"
                            name="releaseYear"
                            onChange={handleChange}
                            value={book.releaseYear}
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            name="image"
                            onChange={handleChange}
                            value={book.image}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="amount"
                            onChange={handleChange}
                            value={book.amount}
                        />
                        <div className="button" onClick={addBook}>
                            Create Task
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default ModalAdd;

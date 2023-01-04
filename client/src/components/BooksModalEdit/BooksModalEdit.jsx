import React from "react";
import "./BooksModalEdit.scss";

const BooksModalEdit = ({
    editBook,
    onClickClose,
    handleChange,
    newBook,
    newUser,
}) => {

    return (
        <>
            {newBook.bookName ? (
                <div className="popup">
                    <div className="closePopup" onClick={onClickClose}>
                        x
                    </div>
                    <div className="content">
                        <h3>Edit Book</h3>
                        <input
                            placeholder="title"
                            type="text"
                            className="add-todo-input"
                            name="bookName"
                            onChange={(e) => handleChange(e, "book")}
                            value={newBook.bookName ? newBook.bookName : ""}
                        />

                        <input
                            type="text"
                            className="add-todo-input"
                            name="authorName"
                            onChange={(e) => handleChange(e, "book")}
                            value={newBook.authorName ? newBook.authorName : ""}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="pages"
                            onChange={(e) => handleChange(e, "book")}
                            value={newBook.pages ? newBook.pages : 0}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="releaseYear"
                            onChange={(e) => handleChange(e, "book")}
                            value={
                                newBook.releaseYear ? newBook.releaseYear : ""
                            }
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            name="image"
                            onChange={(e) => handleChange(e, "book")}
                            value={newBook.image ? newBook.image : ""}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="amount"
                            onChange={(e) => handleChange(e, "book")}
                            value={newBook.amount ? newBook.amount : 0}
                        />
                        <div className="button" onClick={() => editBook("book")}>
                            Edit Book
                        </div>
                    </div>
                </div>
            ) : (
                <div className="popup">
                    <div className="closePopup" onClick={onClickClose}>
                        x
                    </div>
                    <div className="content">
                        <h3>Edit User</h3>
                        <input
                            placeholder="title"
                            type="text"
                            className="add-todo-input"
                            name="name"
                            onChange={(e) => handleChange(e, "user")}
                            value={newUser.name ? newUser.name : ""}
                        />

                        <input
                            type="text"
                            className="add-todo-input"
                            name="surname"
                            onChange={(e) => handleChange(e, "user")}
                            value={newUser.surname ? newUser.surname : ""}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="birthNumber"
                            onChange={(e) => handleChange(e, "user")}
                            value={
                                newUser.birthNumber ? newUser.birthNumber : 0
                            }
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            name="username"
                            onChange={(e) => handleChange(e, "user")}
                            value={newUser.username ? newUser.username : ""}
                        />
                        <div className="button" onClick={() => editBook("user")}>
                            Edit User
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BooksModalEdit;

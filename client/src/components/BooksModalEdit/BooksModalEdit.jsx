import React from "react";
import "./BooksModalEdit.scss";

const BooksModalEdit = ({
    isEdit,
    editBook,
    onClickClose,
    handleChange,
    newBook,
}) => {
    return (
        <>
            {isEdit ? (
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
                            onChange={handleChange}
                            value={newBook.bookName ? newBook.bookName : ""}
                        />

                        <input
                            type="text"
                            className="add-todo-input"
                            name="authorName"
                            onChange={handleChange}
                            value={newBook.authorName ? newBook.authorName : ""}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="pages"
                            onChange={handleChange}
                            value={newBook.pages ? newBook.pages : 0}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="releaseYear"
                            onChange={handleChange}
                            value={
                                newBook.releaseYear ? newBook.releaseYear : ""
                            }
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            name="image"
                            onChange={handleChange}
                            value={newBook.image ? newBook.image : ""}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            name="amount"
                            onChange={handleChange}
                            value={newBook.amount ? newBook.amount : 0}
                        />
                        <div className="button" onClick={editBook}>
                            Edit Book
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default BooksModalEdit;

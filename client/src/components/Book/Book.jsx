import React from "react";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import "./Book.scss";

const Book = ({book, onDeleteClick, onEditClick, onAddClick}) => {
    return (
        <div className="book" key={book._id}>
            <picture className="book__img">
                <img src={book.image} alt={book.bookName}/>
            </picture>

            <div className="book__content">
                <h3 className="book__title">{book.bookName}</h3>

                <p className="book__author">
                    by <strong>{book.authorName}</strong>
                </p>

                <p className="book__year">Published: {book.releaseYear}</p>

                <p>{book.amount}</p>

                <div className="flex-group">
                    <button onClick={() => onAddClick(book)}>Borrow</button>
                    <button
                        className="edit-btn"
                        onClick={() => {
                            onEditClick(book);
                        }}
                    >
                        Edit
                    </button>
                    <ButtonDelete
                        onClick={() => onDeleteClick(book._id)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Book;

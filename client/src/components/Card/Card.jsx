import React from "react";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import "./Card.scss";

const Card = ({books, onDeleteClick, onEditClick, setShowEditModal, onAddClick}) => {
    return (
        <>
            {books.map((book) => {
                return (
                    <div className="book" key={book._id}>
                        <picture className="book__img">
                            <img src={book.image} alt={book.bookName} />
                        </picture>

                        <div className="book__content">
                            <h3 className="book__title">{book.bookName}</h3>

                            <p className="book__author">
                                by <strong>{book.authorName}</strong>
                            </p>

                            <p className="book__year">Published: {book.releaseYear}</p>

                            <p>{book.amount}</p>

                            <div className="flex-group">
                                <button onClick={() => onAddClick(
                                    book._id,
                                    book.bookName,
                                    book.authorName,
                                    book.pages,
                                    book.releaseYear,
                                    book.image,
                                    book.amount
                                )}>Borrow
                                </button>
                                <button
                                    className="edit-btn"
                                    onClick={() => {
                                        onEditClick(
                                            book._id,
                                            book.bookName,
                                            book.authorName,
                                            book.pages,
                                            book.releaseYear,
                                            book.image,
                                            book.amount
                                        );
                                        setShowEditModal(true);
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
            })}
        </>
    );
};

export default Card;

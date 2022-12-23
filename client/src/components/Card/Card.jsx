import React from "react";
import ButtonDelete from "../ButtonDelete/ButtonDelete";
import "./Card.scss";

const Card = ({books, onDeleteClick, onEditClick, setShowEditModal, onAddClick}) => {
    return (
        <>
            {books.map((book) => {
                return (
                    <div className="card" key={book._id}>
                        <div className="card__header">
                            <img
                                className="card__image"
                                src={book.image}
                                alt="harry potter book"
                            />
                        </div>
                        <div className="card__body">
                            <div className="card__body__top">
                                <h3 className="title">{book.bookName}</h3>
                                <span className="author">
                                    by <strong>{book.authorName}</strong>
                                </span>
                                <span className="year">
                                    Published: {book.releaseYear}
                                </span>
                            </div>
                            <div className="card__body__bottom">
                                <span>{book.amount}</span>
                                <div className="card__body__bottom__btns">
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
                    </div>
                );
            })}
        </>
    );
};

export default Card;

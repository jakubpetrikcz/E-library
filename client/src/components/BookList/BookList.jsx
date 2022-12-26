import React from "react";
import "./BookList.scss";
import Book from "../Book/Book";

const BookList = ({books, filteredResults, query, deleteBook, editBook, setShowEditModal, handleBorrowBook}) => {
    return (
        <div className="card-container">
            {(query.bookName || query.authorName || query.releaseYear) ?
                filteredResults.map((filteredBook) => (
                        <Book
                            key={filteredBook._id}
                            book={filteredBook}
                            onDeleteClick={deleteBook}
                            onEditClick={editBook}
                            setShowEditModal={setShowEditModal}
                            onAddClick={handleBorrowBook}
                        />
                    )
                ) : (books.map(book => (
                        <Book
                            key={book._id}
                            book={book}
                            onDeleteClick={deleteBook}
                            onEditClick={editBook}
                            setShowEditModal={setShowEditModal}
                            onAddClick={handleBorrowBook}
                        />
                    ))
                )
            }
        </div>
    );
};

export default BookList;

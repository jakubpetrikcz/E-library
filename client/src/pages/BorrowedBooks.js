import CardContainer from "../components/CardContainer/CardContainer";
import Header from "../components/Header/Header";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "../components/Card/Card";
import ButtonDelete from "../components/ButtonDelete/ButtonDelete";


const API_BASE = "http://localhost:3001";
const BorrowedBooks = () => {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    // const [userData, setUserData] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.post(API_BASE + "/userData", { token })
            .then((res) => {
                console.log(res.data, 'userData');
                setBorrowedBooks(res.data.data.borrowedBooks);
            });

    }, []);

    // const deleteBook = async (id) => {
    //     axios
    //         .delete(API_BASE + `/book/delete/${id}`)
    //         .then((res) => {
    //             const data = res.data;
    //             setBorrowedBooks((books) =>
    //                 books.filter((book) => book._id !== data._id)
    //             );
    //         })
    //         .catch((err) => console.log(err));
    // };

    return (
        <>
            <Header />
            <div className="grid-container">
                {borrowedBooks.map((book, index) => {
                    return (
                        <div className="card" key={index}>
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
                                    <div className="card__body__bottom__btns">
                                        <ButtonDelete
                                            // onClick={() => deleteBook(book._id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>

    )
}

export default BorrowedBooks;
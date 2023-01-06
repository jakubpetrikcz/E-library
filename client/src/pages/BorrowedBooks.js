import Header from "../components/Header/Header";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ButtonDelete from "../components/ButtonDelete/ButtonDelete";
import { UserContext } from "../components/UserContext";

const API_BASE = "http://localhost:3001";
const BorrowedBooks = () => {
    // const {userData} = useContext(UserContext);

    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [userData, setUserData] = useState(null);

    const getBorrowedBooks = async () => {
        try {
            const { data } = await axios.get(API_BASE + "/userData");
            // console.log(data.borrowedBooks);
            setBorrowedBooks(data.borrowedBooks);
            setUserData(data);
            // console.log(userData);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // setBorrowedBooks(userData.borrowedBooks);
        // const token = getCookie('access_token');

        // console.log(token);
        getBorrowedBooks();
    }, []);

    const deleteBook = async (id) => {
        axios
            .put(API_BASE + `/borrowBook/${id}`, {
                userId: userData._id,
                bookId: id,
            })
            .then((res) => {
                const data = res.data;
                // console.log(data);
                setBorrowedBooks(data.user.borrowedBooks);
                // setUserData.borrowedBooks(data.borrowedBooks);
                // userData.borrowedBooks = data;
            })
            .catch((err) => console.log(err));
    };

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
                                            onClick={() => deleteBook(book.id)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default BorrowedBooks;

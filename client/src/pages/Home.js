import BookList from "../components/BookList/BookList";
import Header from "../components/Header/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import BooksFormFilter from "../components/BooksFormFilter/BooksFormFilter";

const API_BASE = "http://localhost:3001";
const Home = () => {
    const [books, setBooks] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);

    const [query, setQuery] = useState({
        bookName: "",
        authorName: "",
        releaseYear: 0,
    });

    const [userData, setUserData] = useState(null);

    // const userData = JSON.parse(localStorage.getItem("token"));
    // console.log(userData);

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //
    //     axios.post(API_BASE + "/userData", {token})
    //         .then((res) => {
    //             setUserData(res.data.data);
    //         });
    //
    // }, []);

    const getUserData = async () => {
        try {
            const { data } = await axios.get(API_BASE + "/userData");
            setUserData(data);
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        axios
            .get(API_BASE + `/books`)
            .then((res) => {
                setBooks(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    // useEffect(() => {
    //     console.log("ahoj");

    //     axios.get(API_BASE + "/userData").then((res) => {
    //         console.log(res.data);
    //     });
    // }, []);

    const handleBorrowBook = async (book) => {
        try {
            const response = await axios.put(API_BASE + "/borrowBook", {
                userId: userData._id,
                book: {
                    id: book._id,
                    bookName: book.bookName,
                    authorName: book.authorName,
                    pages: book.pages,
                    releaseYear: book.releaseYear,
                    image: book.image,
                    amount: 1,
                },
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header />
            <div className="grid-container">
                <h1 className="title">Catalogue</h1>
                <BooksFormFilter
                    books={books}
                    query={query}
                    setQuery={setQuery}
                    setFilteredResults={setFilteredResults}
                />
                <BookList
                    books={books}
                    query={query}
                    // deleteBook={deleteBook}
                    filteredResults={filteredResults}
                    // editBook={editBook}
                    // setShowEditModal={setShowEditModal}
                    handleBorrowBook={handleBorrowBook}
                />
            </div>
        </>
    );
};

export default Home;

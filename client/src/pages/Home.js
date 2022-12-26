import BookList from "../components/BookList/BookList";
import Header from "../components/Header/Header";
import React, {useEffect, useState} from "react";
import axios from "axios";
import BooksFormFilter from "../components/BooksFormFilter/BooksFormFilter";
import BooksModalEdit from "../components/BooksModalEdit/BooksModalEdit";
import ButtonAdd from "../components/ButtonAdd/ButtonAdd";
import BooksModalAdd from "../components/BooksModalAdd/BooksModalAdd";


const API_BASE = "http://localhost:3001";
const Home = () => {
    const [books, setBooks] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [query, setQuery] = useState({
        bookName: "",
        authorName: "",
        releaseYear: 0,
    });
    const [newBook, setNewBook] = useState({
        id: "",
        bookName: "",
        authorName: "",
        pages: 0,
        releaseYear: 0,
        image: "",
        amount: 0,
    });
    // const [userData, setUserData] = useState("");

    const userData = JSON.parse(localStorage.getItem('token'));
    console.log(userData);

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //
    //     axios.post(API_BASE + "/userData", {token})
    //         .then((res) => {
    //             setUserData(res.data.data);
    //         });
    //
    // }, []);


    useEffect(() => {
        axios
            .get(API_BASE + `/books`)
            .then((res) => {
                setBooks(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const deleteBook = async (id) => {
        axios
            .delete(API_BASE + `/book/delete/${id}`)
            .then((res) => {
                const data = res.data;
                setBooks((books) =>
                    books.filter((book) => book._id !== data._id)
                );
            })
            .catch((err) => console.log(err));
    };

    const editBook = async (book) => {
        setNewBook((prev) => {
            return {
                ...prev,
                id: book._id,
                bookName: book.bookName,
                authorName: book.authorName,
                pages: book.pages,
                releaseYear: book.releaseYear,
                image: book.image,
                amount: book.amount,
            };
        });

        setShowEditModal(true);
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setNewBook((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const saveUpdatedPost = async () => {
        axios
            .put(API_BASE + `/book/update/${newBook.id}`, newBook)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        setShowEditModal(false);
        window.location.reload();
    };

    const handleBorrowBook = async (book) => {
        try {
            const response = await axios.put(API_BASE + '/borrowBook', {
                userId: userData.user._id,
                book: {
                    id: book._id,
                    bookName: book.bookName,
                    authorName: book.authorName,
                    pages: book.pages,
                    releaseYear: book.releaseYear,
                    image: book.image,
                    amount: book.amount,
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <Header/>
            <div className="grid-container">
                <h1 className="title">Catalogue</h1>
                <BooksFormFilter books={books} query={query} setQuery={setQuery}
                                 setFilteredResults={setFilteredResults}/>
                <BookList books={books} query={query} deleteBook={deleteBook} filteredResults={filteredResults}
                          editBook={editBook} setShowEditModal={setShowEditModal} handleBorrowBook={handleBorrowBook}/>
            </div>
            <BooksModalEdit
                isEdit={showEditModal}
                editBook={saveUpdatedPost}
                onClickClose={() => setShowEditModal(false)}
                handleChange={handleChange}
                newBook={newBook}
            />
            <ButtonAdd onClick={() => setShowAddModal(true)}/>
            <BooksModalAdd
                isAdd={showAddModal}
                onClickClose={() => setShowAddModal(false)}
            />
        </>

    )
}

export default Home;
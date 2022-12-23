import React from "react";
import axios from "axios";
import {useState, useEffect} from "react";
import "./CardContainer.scss";
import Card from "../Card/Card";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import BooksModalAdd from "../BooksModalAdd/BooksModalAdd";
import BooksModalEdit from "../BooksModalEdit/BooksModalEdit";
import BooksFormFilter from "../BooksFormFilter/BooksFormFilter";

const API_BASE = "http://localhost:3001";

const CardContainer = () => {
    const [books, setBooks] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newBook, setNewBook] = useState({
        id: "",
        bookName: "",
        authorName: "",
        pages: 0,
        releaseYear: 0,
        image: "",
        amount: 0,
    });

    const [query, setQuery] = useState({
        bookName: "",
        authorName: "",
        releaseYear: 0,
    });


    useEffect(() => {
        axios
            .get(API_BASE + `/books`)
            .then((res) => {
                setBooks(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const editBook = async (
        id,
        bookName,
        authorName,
        pages,
        releaseYear,
        image,
        amount
    ) => {
        setNewBook((prev) => {
            return {
                ...prev,
                id: id,
                bookName: bookName,
                authorName: authorName,
                pages: pages,
                releaseYear: releaseYear,
                image: image,
                amount: amount,
            };
        });

        setShowEditModal(true);
    };

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

    const saveUpdatedPost = async () => {
        axios
            .put(API_BASE + `/book/update/${newBook.id}`, newBook)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        setShowEditModal(false);
        window.location.reload();
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

    const handleBorrowBook = async (
        id,
        bookName,
        authorName,
        pages,
        releaseYear,
        image,
        amount
    ) => {
        try {
            // Send a request to the backend to borrow the book
            const response = await axios.put(API_BASE + '/borrowBook', {
                userId: "63a219a580df74b5c8ba49bc",
                book: {
                    id: id,
                    bookName: bookName,
                    authorName: authorName,
                    pages: pages,
                    releaseYear: releaseYear,
                    image: image,
                    amount: amount,
                }
            });
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>
            <div className="grid-container">
                <h1 className="title">Catalogue</h1>
                <BooksFormFilter books={books} query={query} setQuery={setQuery}
                                 setFilteredResults={setFilteredResults}/>
                <div className="card-container">
                    {query.bookName || query.authorName || query.releaseYear ? (
                        <Card
                            books={filteredResults}
                            onDeleteClick={deleteBook}
                            onEditClick={editBook}
                            setShowEditModal={setShowEditModal}
                        />
                    ) : (
                        <Card
                            books={books}
                            onDeleteClick={deleteBook}
                            onEditClick={editBook}
                            setShowEditModal={setShowEditModal}
                            onAddClick={handleBorrowBook}
                        />
                    )}
                </div>
                <ButtonAdd onClick={() => setShowAddModal(true)}/>
                <BooksModalAdd
                    isAdd={showAddModal}
                    onClickClose={() => setShowAddModal(false)}
                />
                <BooksModalEdit
                    isEdit={showEditModal}
                    editBook={saveUpdatedPost}
                    onClickClose={() => setShowEditModal(false)}
                    handleChange={handleChange}
                    newBook={newBook}
                />
            </div>
        </>
    );
};

export default CardContainer;

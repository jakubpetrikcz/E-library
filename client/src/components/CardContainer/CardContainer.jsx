import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./CardContainer.scss";
import Card from "../Card/Card";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ModalAdd from "../ModalAdd/ModalAdd";
import ModalEdit from "../ModalEdit/ModalEdit";
// import { useSearchParams } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

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

    // const [searchParams, setSearchParams] = useSearchParams();
    const [query, setQuery] = useState({
        bookName: "",
        authorName: "",
        releaseYear: 0,
    });
    const navigate = useNavigate();
    const { bookName, authorName, releaseYear } = useParams();

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
        const { name, value } = e.target;
        setNewBook((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setQuery((prevQuery) => ({ ...prevQuery, [name]: value }));
    };

    const searchItems = (e) => {
        e.preventDefault();

        let queryString = "";
        if (query.bookName) {
            queryString += `bookName=${query.bookName}`;
        }
        if (query.authorName) {
            queryString += `${queryString ? "&" : ""}authorName=${query.authorName}`;
        }
        if (query.releaseYear) {
            queryString += `${queryString ? "&" : ""}releaseYear=${query.releaseYear}`;
        }

        if (!queryString) {
            setFilteredResults(books);
            return;
        }

        axios
            .get(`${API_BASE}/books?${queryString}`)
            .then((res) => {
                setFilteredResults(res.data);
            })
            .catch((err) => console.log(err));
    };

    

    return (
        <>
            <div className="grid-container">
                <h1 className="title">Catalogue</h1>
                <form onSubmit={searchItems}>
                    <input
                        type="text"
                        placeholder="title"
                        name="bookName"
                        value={query.bookName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        placeholder="author"
                        name="authorName"
                        value={query.authorName}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        placeholder="year"
                        name="releaseYear"
                        value={query.releaseYear}
                        onChange={handleInputChange}
                    />
                    <button
                        style={{ height: "50px", width: "50px" }}
                        type="submit"
                    />
                </form>
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
                        />
                    )}
                </div>
                <ButtonAdd onClick={() => setShowAddModal(true)} />
                <ModalAdd
                    isAdd={showAddModal}
                    onClickClose={() => setShowAddModal(false)}
                />

                <ModalEdit
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

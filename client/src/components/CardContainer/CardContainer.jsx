import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./CardContainer.scss";
import Card from "../Card/Card";
import ButtonAdd from "../ButtonAdd/ButtonAdd";
import ModalAdd from "../ModalAdd/ModalAdd";
import ModalEdit from "../ModalEdit/ModalEdit";

const API_BASE = "http://localhost:3001";

const CardContainer = () => {
    const [books, setBooks] = useState([]);
    const [query, setQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newBook, setNewBook] = useState({
        id: "",
        bookName: "",
        authorName: "",
        pages: 0,
        releaseYear: "",
        image: "",
        amount: 0,
    });

    useEffect(() => {
        axios
            .get(API_BASE + "/books")
            .then((res) => {
                setBooks(res.data);
            })
            .catch((err) => console.log(err));
    }, [books]);

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

    const searchItems = (searchValue) => {
        setQuery(searchValue);
        if (query !== "") {
            const filteredData = books.filter((item) => {
                return Object.values(item)
                    .join("")
                    .toLowerCase()
                    .includes(query.toLowerCase());
            });
            setFilteredResults(filteredData);
        } else {
            setFilteredResults(books);
        }
    };

    return (
        <>
            <div className="grid-container">
                <h1 className="title">Catalogue</h1>
                <input
                    type="text"
                    placeholder="Search Book ..."
                    value={query}
                    onChange={(e) => searchItems(e.target.value)}
                />
                <div className="card-container">
                    {query.length > 3 ? (
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

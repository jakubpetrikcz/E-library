import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import User from "../User/User";
import "./UserList.scss";
import axios from "axios";
import BooksModalEdit from "../../BooksModalEdit/BooksModalEdit";

const API_BASE = "http://localhost:3001";

const UserList = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];

    const [data, setData] = useState([]);
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
    const [newUser, setNewUser] = useState({
        id: "",
        name: "",
        surname: "",
        birthNumber: 0,
        username: "",
    });

    useEffect(() => {
        axios
            .get(API_BASE + `/${path}`)
            .then((res) => {
                // console.log(res.data);
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }, [path]);

    const deleteItem = async (id) => {
        axios
            .delete(API_BASE + `/${path}/delete/${id}`)
            .then((res) => {
                const data = res.data;
                setData((books) =>
                    books.filter((book) => book._id !== data._id)
                );
            })
            .catch((err) => console.log(err));
    };

    const saveUpdatedPost = async (entityType) => {
        if (entityType === 'book') {
            axios
                .put(API_BASE + `/books/update/${newBook.id}`, newBook)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        } else if (entityType === 'user') {
            axios
                .put(API_BASE + `/users/update/${newUser.id}`, newUser)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
        }
    
        setShowEditModal(false);
        window.location.reload();
    };

    const editBook = (entity) => {
        // console.log(entity);
        if (entity.bookName) {
            setNewBook((prev) => {
                return {
                    ...prev,
                    id: entity._id,
                    bookName: entity.bookName,
                    authorName: entity.authorName,
                    pages: entity.pages,
                    releaseYear: entity.releaseYear,
                    image: entity.image,
                    amount: entity.amount,
                };
            });
        } else {
            setNewUser((prev) => {
                return {
                    ...prev,
                    id: entity._id,
                    name: entity.name,
                    surname: entity.surname,
                    birthNumber: entity.birthNumber,
                    username: entity.username,
                };
            });
        }

        setShowEditModal(true);
    };

    const handleChange = (e, entityType) => {
        const { name, value } = e.target;
        if (entityType === 'book') {
            setNewBook((prev) => {
                return {
                    ...prev,
                    [name]: value,
                };
            });
        } else if (entityType === 'user') {
            setNewUser((prev) => {
                return {
                    ...prev,
                    [name]: value,
                };
            });
        }
    };

    return (
        <>
            <h3 className="list-title">{path}</h3>
            {data.map((item, i) => (
                <User
                    item={item}
                    key={i}
                    onDeleteClick={deleteItem}
                    onEditClick={editBook}
                />
            ))}
            {showEditModal ? (
                <BooksModalEdit
                    editBook={saveUpdatedPost}
                    onClickClose={() => setShowEditModal(false)}
                    handleChange={handleChange}
                    newBook={newBook}
                    newUser={newUser}
                />
            ) : (
                ""
            )}
        </>
    );
};

export default UserList;

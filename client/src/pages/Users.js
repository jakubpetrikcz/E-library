import User from "../components/Admin/User/User";
import axios from "axios";
import React, { useEffect, useState } from "react";
import UsersModalEdit from "../components/UsersModalEdit/UsersModalEdit";
import Header from "../components/Header/Header";

const API_BASE = "http://localhost:3001";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newUser, setNewUser] = useState({
        id: "",
        name: "",
        surname: "",
        birthNumber: "",
        username: "",
        password: "",
    });

    useEffect(() => {
        axios
            .get(API_BASE + `/users`)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const editUser = async (
        id,
        name,
        surname,
        birthNumber,
        username,
        password
    ) => {
        setNewUser((prev) => {
            return {
                ...prev,
                id: id,
                name: name,
                surname: surname,
                birthNumber: birthNumber,
                username: username,
                password: password,
            };
        });

        setShowEditModal(true);
    };

    const deleteUser = async (id) => {
        axios
            .delete(API_BASE + `/user/delete/${id}`)
            .then((res) => {
                const data = res.data;
                setUsers((users) =>
                    users.filter((user) => user._id !== data._id)
                );
            })
            .catch((err) => console.log(err));
    };

    const saveUpdatedPost = async () => {
        axios
            .put(API_BASE + `/user/update/${newUser.id}`, newUser)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        setShowEditModal(false);
        window.location.reload();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    return (
        <div className="grid-container">
            <h1 className="title">Users</h1>
            <User
                users={users}
                onEditClick={editUser}
                setShowEditModal={setShowEditModal}
                onDeleteClick={deleteUser}
            />

            <UsersModalEdit
                isEdit={showEditModal}
                editUser={saveUpdatedPost}
                onClickClose={() => setShowEditModal(false)}
                handleChange={handleChange}
                newUser={newUser}
            />
        </div>
    );
};

export default Users;

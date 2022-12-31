import React, { useEffect, useState } from "react";
import User from "../User/User";
import axios from "axios";

const API_BASE = "http://localhost:3001";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios
            .get(API_BASE + `/users`)
            .then((res) => {
                setUsers(res.data);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="grid-container">
            {users.map((user) => (
                <User
                    user={user}
                />
            ))}
        </div>
    );
};

export default UserList;

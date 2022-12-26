import React, {useEffect, useState} from "react";
import "./Header.scss";
import {Link, Outlet} from "react-router-dom";
import axios from "axios";

const API_BASE = "http://localhost:3001";

const Header = () => {
    const user = JSON.parse(localStorage.getItem('token'));

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //
    //     axios.post(API_BASE + "/userData", { token })
    //         .then((res) => {
    //             // console.log(res.data, 'userData');
    //             setUserData(res.data.data);
    //         });
    //
    // }, []);
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <>
            <header>
                <div className="grid-container flex">
                    <div className="logo">E-library</div>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/users">Users</Link>
                        <Link to="/borrowed">Borrowed</Link>
                        {/*<Link to="/login">Login</Link>*/}
                        {/*<Link to="/register">Register</Link>*/}
                    </nav>
                    <div>
                        <span>{user.user.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </header>
            <Outlet/>
        </>
    );
};

export default Header;
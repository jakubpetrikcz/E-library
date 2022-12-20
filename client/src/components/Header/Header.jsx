import React from "react";
import "./Header.scss";
import {Link, Outlet} from "react-router-dom";

const Header = () => {
    return (
        <>
            <header>
                <div className="grid-container flex">
                    <div className="logo">E-library</div>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/users">Users</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </nav>
                    <div>Name<h2></h2></div>
                </div>
            </header>
            <Outlet/>
        </>
    );
};

export default Header;
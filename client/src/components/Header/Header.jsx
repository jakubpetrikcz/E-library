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
                        <Link to="/">Users</Link>
                        <Link to="/">Login</Link>
                    </nav>
                </div>
            </header>
            <Outlet/>
        </>
    );
};

export default Header;
import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.scss";

const SideBar = () => {
    return (
        <header className="admin__panel">
            <div className="flex">
                <nav className="column">
                    <Link to="/admin/users">Users</Link>
                    <Link to="/admin/books">Books</Link>
                    <Link to="/admin/users">Users</Link>
                    <Link to="/admin/users">Users</Link>
                </nav>
                {/* <div>
                    <span>{user.name}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div> */}
            </div>
        </header>
    );
};

export default SideBar;

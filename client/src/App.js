import React from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
// import routes from './routes';
import Home from "./pages/Home";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BorrowedBooks from "./pages/BorrowedBooks";

function App() {
    const user = localStorage.getItem("token");

    return (
        <Routes>
            {user && <Route path="/" exact element={<Home />} />}
            <Route path="/users" exact element={<Users/>} />
            <Route path="/borrowed" exact element={<BorrowedBooks />} />
            <Route path="/register" exact element={<Register/>} />
            <Route path="/login" exact element={<Login/>} />
            <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
    );
}

export default App;

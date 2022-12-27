import React, {useEffect, useState} from "react";
import {Routes, Route, Navigate} from 'react-router-dom';
// import routes from './routes';
import Home from "./pages/Home";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BorrowedBooks from "./pages/BorrowedBooks";
import UserContextProvider, {UserContext} from "./components/UserContext";
import axios from "axios";
import { useQuery } from "react-query";
import Header from "./components/Header/Header";

const API_BASE = "http://localhost:3001";

function App() {
    const user = localStorage.getItem("token");

    // let userData = "";

    // const [userData, setUserData] = useState(null);
    // //
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //
    //     axios.post(API_BASE + "/userData", {token})
    //         .then((res) => {
    //             setUserData(res.data.data);
    //             // userData = res.data.data;
    //         }).catch(error => console.error(error));
    // }, []);

    return (
        <Routes>
            <Route path="/register" exact element={<Register />} />
            <Route path="/login" exact element={<Login />} />
            {user && (
                <>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/users" exact element={<Users />} />
                    <Route path="/borrowed" exact element={<BorrowedBooks />} />
                </>
            )}
            <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
    );
}

export default App;

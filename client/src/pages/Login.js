// import BookList from "../components/BookList/BookList";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const API_BASE = "http://localhost:3001";

const Login = () => {
    // const [user, setUser] = useState({
    //     username: "",
    //     password: "",
    // });
    const { auth } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (auth) {
            navigate("/");
        }
    }, [auth, navigate]);

    axios.defaults.withCredentials = true;

    // const handleInputChange = (event) => {
    //     const { name, value } = event.target;
    //     setUser((prevQuery) => ({ ...prevQuery, [name]: value }));
    // };

    const loginUser = async (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        try {
            await axios.post(API_BASE + "/user/login", {
                username,
                password,
            });
            alert("Login successful");
            navigate("/");
        } catch (err) {
            console.log(err);
        }
        // await axios.post(API_BASE + "/user/login", user)
        //     .then((res) => {
        //         console.log(res);
        //         if (res.data.user) {
        //             // localStorage.setItem("token", JSON.stringify(res.data.user));
        //             alert("Login successful");
        //             navigate("/");
        //             // window.location.href = "/";
        //             console.log(res);
        //         } else {
        //             alert("Please check your username and password");
        //         }
        //     })
        //     .catch((err) => console.log(err))
    };

    return (
        <div className="grid-container">
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input
                    name="username"
                    type="text"
                    placeholder="username"
                    required
                />
                <input
                    name="password"
                    type="password"
                    placeholder="password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <Link style={{ color: "white" }} to="/register">
                Don't have account? Sign up here...
            </Link>
        </div>
    );
};

export default Login;

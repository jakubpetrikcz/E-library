// import BookList from "../components/BookList/BookList";

import React, {useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const API_BASE = "http://localhost:3001";

const Login = () => {
    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate()

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser((prevQuery) => ({...prevQuery, [name]: value}));
    };

    const loginUser = async (event) => {
        event.preventDefault();
        await axios.post(API_BASE + "/user/login", user)
            .then((res) => {
                if (res.data.user) {
                    localStorage.setItem("token", JSON.stringify(res.data.user));
                    alert("Login successful");
                    // navigate("/");
                    window.location.href = "/";
                    console.log(res);
                } else {
                    alert("Please check your username and password");
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <div className="grid-container">
            <h1>Login</h1>
            <form onSubmit={loginUser}>
                <input type="text" placeholder="username" name="username" value={user.username} onChange={handleInputChange}/>
                <input type="password" placeholder="password" name="password" value={user.password} onChange={handleInputChange}/>
                <input type="submit" value="Login"/>
            </form>
            <Link style={{color: "white"}} to="/register">Don't have account? Sign up here...</Link>
        </div>
    )
}

export default Login;
// import CardContainer from "../components/CardContainer/CardContainer";

import React, {useState} from "react";
import axios from "axios";

const API_BASE = "http://localhost:3001";

const Login = () => {
    const [user, setUser] = useState({
        id: "",
        username: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser((prevQuery) => ({...prevQuery, [name]: value}));
    };

    const loginUser = async (event) => {
        event.preventDefault();
        await axios.post(API_BASE + "/user/login", user)
            .then((res) => {
                if (res.data.user) {
                    localStorage.setItem("token", res.data.user);
                    alert("Login successful");
                    window.location.href = "/";
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
        </div>
    )
}

export default Login;
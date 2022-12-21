// import CardContainer from "../components/CardContainer/CardContainer";

import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const API_BASE = "http://localhost:3001";

const Register = () => {
    const [user, setUser] = useState({
        id: "",
        name: "",
        surname: "",
        birthNumber: "",
        username: "",
        password: "",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser((prevQuery) => ({...prevQuery, [name]: value}));
    };

    const registerUser = async (event) => {
        event.preventDefault();
        await axios.post(API_BASE + "/user/new", user)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

    }

    return (
        <div className="grid-container">
            <h1>Register</h1>
            <form onSubmit={registerUser}>
                <input type="text" placeholder="First Name" name="name" value={user.name} onChange={handleInputChange}/>
                <input type="text" placeholder="Last Name" name="surname" value={user.surname} onChange={handleInputChange}/>
                <input type="text" placeholder="Birth Number" name="birthNumber" value={user.birthNumber} onChange={handleInputChange}/>
                <input type="text" placeholder="username" name="username" value={user.username} onChange={handleInputChange}/>
                <input type="password" placeholder="password" name="password" value={user.password} onChange={handleInputChange}/>
                <input type="submit" value="Register"/>
            </form>
            <Link style={{color: "white"}} to="/login">Already have an account? Sign in...</Link>
        </div>
    )
}

export default Register;
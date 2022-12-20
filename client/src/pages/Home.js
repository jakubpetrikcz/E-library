import CardContainer from "../components/CardContainer/CardContainer";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
// const jwt = require('jsonwebtoken');

const API_BASE = "http://localhost:3001";

const Home = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log(token);

        axios.post(API_BASE + "/userData", { token })
            .then((res) => {
                console.log(res.data, 'userData');
                setUserData(res.data.data);
            });
        // console.log(token);
        // if (token) {
        //     const user = jwt.decode(token);
        //     if (!user) {
        //         localStorage.removeItem("token");
        //         navigate("/login");
        //     } else {
        //         // Do something...
        //     }
        // }

    }, []);

    return (
        <CardContainer />
    )
}

export default Home;
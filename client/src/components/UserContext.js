import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {Outlet} from 'react-router-dom';

const API_BASE = "http://localhost:3001";

export const UserContext = createContext(null);
const UserContextProvider = () => {
    const [userData, setUserData] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios.post(API_BASE + "/userData", {token})
            .then((res) => {
                setUserData(res.data.data);
                // setIsLoaded(true)
            });
    }, []);

    const value = {
        userData,
        setUserData,
        // getUserData
    }

    return (
        <UserContext.Provider value={value}>
            <Outlet/>
        </UserContext.Provider>
    )
}

export default UserContextProvider;
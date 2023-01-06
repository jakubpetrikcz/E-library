import React, { useEffect, useState } from "react";
import "./Header.scss";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";

const API_BASE = "http://localhost:3001";

const Header = () => {
    // const user = JSON.parse(localStorage.getItem('token'));

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const { data } = await axios.get(API_BASE + "/userData");
            setUser(data);
            // console.log(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleLogout = async () => {
        try {
          await axios.get(API_BASE + '/logout');
          setUser(null);
          navigate('/login');
        } catch (err) {
          console.log(err);
        }
      };

    if (!user) return null;

    return (
        <>
            <header>
                <div className="grid-container flex">
                    <div className="logo">E-library</div>
                    <nav>
                        <Link to="/">Home</Link>
                        <Link to="/borrowed">Borrowed</Link>
                        {/*<Link to="/login">Login</Link>*/}
                        {/*<Link to="/register">Register</Link>*/}
                    </nav>
                    <div>
                        <span>{user?.name}</span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default Header;

import React from "react";
import {Routes, Route} from 'react-router-dom';
// import routes from './routes';
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Users from "./pages/Users";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Header/>}>
                <Route path="/" exact element={<Home/>} />
                <Route path="/users" exact element={<Users/>} />
                <Route path="/register" exact element={<Register/>} />
                <Route path="/login" exact element={<Login/>} />
            </Route>
        </Routes>
    );
}

export default App;

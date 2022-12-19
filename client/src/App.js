import React from "react";
import {Routes, Route} from 'react-router-dom';
// import routes from './routes';
import Home from "./pages/Home";
import Header from "./components/Header/Header";
import Users from "./pages/Users";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Header/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/users" element={<Users/>} />
            </Route>
        </Routes>
    );
}

export default App;

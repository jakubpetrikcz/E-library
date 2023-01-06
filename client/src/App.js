import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
// import routes from './routes';
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import BorrowedBooks from "./pages/BorrowedBooks";
import Admin from "./pages/Admin";
import DataList from "./components/Admin/Container/Container";
import PrivateRoutes from './components/PrivateRoutes';
// import { QueryClient, QueryClientProvider } from "react-query";

function App() {
    // const user = localStorage.getItem("token");

    // const client = new QueryClient();

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
            <Route element={<PrivateRoutes />}>
                <Route path="/" element={<Home />} />
                <Route path="/borrowed" element={<BorrowedBooks />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/users" element={<DataList />} />
                <Route path="/admin/books" element={<DataList />} />
            </Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/" element={<Navigate replace to="/login" />} /> */}
        </Routes>
    );
}

export default App;

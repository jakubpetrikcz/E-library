import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE = "http://localhost:3001";

export default () => {
    const [auth, setAuth] = useState();

    const verifyAuth = async () => {
        try {
            const res = await axios.get(API_BASE + "/is_logged_in");
            return res.data;
        } catch (err) {
            console.log(err);
            return false;
        }
    };

    useEffect(() => {
        (async () => {
            const data = await verifyAuth();
            setAuth(data);
        })();
    }, []);

    return { auth };
};

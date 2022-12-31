import React from "react";
import { useLocation } from "react-router-dom";
import UserList from "../UserList/UserList";

const Datatable = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];

    return (
        <div className="datatable">
            <div className="datatableTitle">{path}</div>

            <UserList />
        </div>
    );
};

export default Datatable;

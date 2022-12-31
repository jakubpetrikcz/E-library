import React from "react";
import AdminPanel from "../components/Admin/AdminPanel/AdminPanel";
import Widget from "../components/Admin/Widget/Widget";

const Admin = () => {
    return (
        <div>
            <AdminPanel />
            <div className="widgets">
                <Widget type="user" />
            </div>
        </div>
    );
};

export default Admin;

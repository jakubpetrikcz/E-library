import React from "react";
import SideBar from "../SideBar/SideBar";
import "./Container.scss";
import UserList from "../UserList/UserList";

const DataList = () => {
    return (
        <div className="list grid-container">
            <SideBar />

            <div className="listContainer">
                <UserList />
            </div>
        </div>
    );
};

export default DataList;

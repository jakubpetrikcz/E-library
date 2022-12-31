import React from "react";
import AdminPanel from "../AdminPanel/AdminPanel";
import Datatable from "../Datatable/Datatable";

const DataList = ({ columns }) => {
    return (
        <div className="list">
            <AdminPanel />

            <div className="listContainer">
                <Datatable columns={columns} />
            </div>
        </div>
    );
};

export default DataList;

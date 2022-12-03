import React from "react";
import "./ButtonDelete.scss";

const ButtonDelete = ({ onClick }) => {
    return (
        <button className="delete-btn" onClick={onClick}>
            Delete
        </button>
    );
};

export default ButtonDelete;

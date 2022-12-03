import React from "react";
import "./ButtonAdd.scss";

const ButtonAdd = ({ onClick }) => {
    return (
        <button className="addPopup" onClick={onClick}>
            +
        </button>
    );
};

export default ButtonAdd;

import React from "react";
import "./User.scss";
import ButtonDelete from "../../ButtonDelete/ButtonDelete";

const User = ({ item, onDeleteClick, onEditClick }) => {

    return (
        <div className="user__card">
            <div className="user__card__header">
                <h3 className="title">
                    {item.bookName ? item.bookName : item.name} {item.surname}
                </h3>
            </div>
            <div className="user__card__body">
                <div className="user__card__body__btns">
                    <button
                        className="edit-btn"
                        onClick={() => onEditClick(item)}
                    >
                        Edit
                    </button>
                    <ButtonDelete onClick={() => onDeleteClick(item._id)} />
                </div>
            </div>
        </div>
    );
};

export default User;

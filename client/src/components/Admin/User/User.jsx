import React from "react";
import "./User.scss";
import ButtonDelete from "../../ButtonDelete/ButtonDelete";

const User = ({ user, onDeleteClick, onEditClick, setShowEditModal }) => {
    return (
        <div className="user__card" key={user._id}>
            <div className="user__card__header">
                <h3 className="title">
                    {user.name} {user.surname}
                </h3>
            </div>
            <div className="user__card__body">
                {/* <div className="user__card__body__btns">
                    <button
                        className="edit-btn"
                        onClick={() => {
                            onEditClick(
                                user._id,
                                user.name,
                                user.surname,
                                user.birthNumber,
                                user.username,
                                user.password
                            );
                            setShowEditModal(true);
                        }}
                    >
                        Edit
                    </button>
                    <ButtonDelete onClick={() => onDeleteClick(user._id)} />
                </div> */}
            </div>
        </div>
    );
};

export default User;

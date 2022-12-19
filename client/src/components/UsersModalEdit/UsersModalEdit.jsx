import React from "react";
import "./UsersModalEdit.scss";

const UsersModalEdit = ({isEdit, editUser, onClickClose, handleChange, newUser}) => {
    return (
        <>
            {isEdit ? (
                <div className="popup">
                    <div className="closePopup" onClick={onClickClose}>
                        x
                    </div>
                    <div className="content">
                        <h3>Edit User</h3>
                        <input
                            placeholder="title"
                            type="text"
                            className="add-todo-input"
                            name="name"
                            onChange={handleChange}
                            value={newUser.name ? newUser.name : ""}
                        />

                        <input
                            type="text"
                            className="add-todo-input"
                            name="surname"
                            onChange={handleChange}
                            value={newUser.surname ? newUser.surname : ""}
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            name="birthNumber"
                            onChange={handleChange}
                            value={newUser.birthNumber ? newUser.birthNumber : 0}
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            name="username"
                            onChange={handleChange}
                            value={
                                newUser.username ? newUser.username : ""
                            }
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            name="password"
                            onChange={handleChange}
                            value={newUser.password ? newUser.password : ""}
                        />
                        <div className="button" onClick={editUser}>
                            Edit Book
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default UsersModalEdit;

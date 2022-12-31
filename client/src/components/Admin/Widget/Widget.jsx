import React from "react";

const Widget = ({ type }) => {
    let data;

    switch (type) {
        case "users":
            data = {
                title: "USERS",
                link: "See all users",
            };
            break;
        default:
            break;
    }

    console.log(data);

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data?.title}</span>
                <span className="link">{data?.link}</span>
            </div>
        </div>
    );
};

export default Widget;

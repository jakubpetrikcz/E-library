import React from "react";
import axios from "axios";
import "./BooksFormFilter.scss";

const API_BASE = "http://localhost:3001";

const BookFormFilter = ({books, query, setQuery, setFilteredResults}) => {

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setQuery((prevQuery) => ({...prevQuery, [name]: value}));
    };

    const searchItems = (e) => {
        e.preventDefault();

        let queryString = "";
        if (query.bookName) {
            queryString += `bookName=${query.bookName}`;
        }
        if (query.authorName) {
            queryString += `${queryString ? "&" : ""}authorName=${query.authorName}`;
        }
        if (query.releaseYear) {
            queryString += `${queryString ? "&" : ""}releaseYear=${query.releaseYear}`;
        }

        if (!queryString) {
            setFilteredResults(books);
            return;
        }

        axios
            .get(`${API_BASE}/books?${queryString}`)
            .then((res) => {
                setFilteredResults(res.data);
            })
            .catch((err) => console.log(err));
    };


    return (
        <>
            <form onSubmit={searchItems}>
                <input
                    type="text"
                    placeholder="title"
                    name="bookName"
                    value={query.bookName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    placeholder="author"
                    name="authorName"
                    value={query.authorName}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    placeholder="year"
                    name="releaseYear"
                    value={query.releaseYear}
                    onChange={handleInputChange}
                />
                <button
                    style={{height: "50px", width: "50px"}}
                    type="submit"
                />
            </form>
        </>
    );
};

export default BookFormFilter;

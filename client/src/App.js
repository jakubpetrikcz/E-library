import CardContainer from "./components/CardContainer/CardContainer";

function App() {
    return (
        <div className="App">
            <CardContainer />
            {/* {books.map((book) => (
                    <div className="todo" key={book._id}>
                        <div className="checkbox"></div>

                        <div className="text">{book.bookName}</div>
                        <div className="text">{book.authorName}</div>
                        <div className="text">{book.pages}</div>
                        <div className="text">{book.releaseYear}</div>
                        <div className="text">{book.image}</div>
                        <div className="text">{book.amount}</div>
                        <div className="text">{book.isBorrowed}</div>

                        <div
                            className="delete-todo"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteBook(book._id);
                            }}
                        >
                            x
                        </div>
                    </div>
                ))} */}

            {/* <div className="addPopup" onClick={() => setPopupActive(true)}>
                +
            </div> */}

            {/* <ButtonAdd onClick={() => setPopupActive(true)} />

            {popupActive ? (
                <div className="popup">
                    <div
                        className="closePopup"
                        onClick={() => setPopupActive(false)}
                    >
                        x
                    </div>
                    <div className="content">
                        <h3>Add Task</h3>
                        <input
                            type="text"
                            className="add-todo-input"
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    bookName: e.target.value,
                                })
                            }
                            value={newBook.bookName}
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    authorName: e.target.value,
                                })
                            }
                            value={newBook.authorName}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    pages: e.target.value,
                                })
                            }
                            value={newBook.pages}
                        />
                        <input
                            type="date"
                            className="add-todo-input"
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    releaseYear: e.target.value,
                                })
                            }
                            value={newBook.releaseYear}
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    image: e.target.value,
                                })
                            }
                            value={newBook.image}
                        />
                        <input
                            type="number"
                            className="add-todo-input"
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    amount: e.target.value,
                                })
                            }
                            value={newBook.amount}
                        />
                        <input
                            type="text"
                            className="add-todo-input"
                            onChange={(e) =>
                                setNewBook({
                                    ...newBook,
                                    isBorrowed: e.target.value,
                                })
                            }
                            value={newBook.isBorrowed}
                        />
                        <div className="button" onClick={addBook}>
                            Create Task
                        </div>

                        {/* <ButtonAdd
                            name="Create Task"
                            className="button"
                            setPopupActive={addBook}
                        /> 
                    </div>
                </div>
            ) : (
                ""
            )} */}
        </div>
    );
}

export default App;

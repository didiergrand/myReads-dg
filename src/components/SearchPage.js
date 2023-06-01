import React, { useState, useEffect, useCallback } from "react";
import Book from "./Book";
import { Link } from "react-router-dom";

const SearchPage = ({
  bookList,
  setBookList
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchBook = useCallback((term) => {
    const results = bookList.filter((book) =>
        book.shelf === "none" &&
        (book.title.toLowerCase().includes(term.toLowerCase())
        || book.authors.toString().toLowerCase().includes(term.toLowerCase())
        || book.industryIdentifiers[0].identifier.toString().toLowerCase().includes(term.toLowerCase()))
    );
    setSearchResults(results);
}, [bookList]);

useEffect(() => {
    searchBook(searchTerm);
}, [bookList, searchTerm, searchBook]);

const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    searchBook(event.target.value);
};
  return (
    <div className="search-books">
      <div className="search-books-bar">

      <Link to="/" className="close-search">Close</Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={handleSearchTermChange}
            value={searchTerm}
          />
        </div>
      </div>
      <div className="search-books-results">
        <div className="list-books">
          <div className="list-books-title">
            <h1>Search Results</h1>
          </div>
          <div className="list-books-content">
            <div className="bookshelf">
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {searchResults.map((book) => {
                    return (
                      <li key={book.id}>
                        <Book book={book} bookList={bookList} setBookList={setBookList} />
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SearchPage;

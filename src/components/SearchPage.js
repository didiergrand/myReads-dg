import * as BooksAPI from "../BooksAPI";
import React, { useState, useEffect } from "react";
import Book from "./Book";
import { Link } from "react-router-dom";
import useDebounce from "../utils/useDebounce";

const SearchPage = ({
  bookList,
  setBookList
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearchQuery = useDebounce(searchTerm, 500); // Debounce search query by 500ms
  useEffect(() => {
    if (debouncedSearchQuery) {
      BooksAPI.search(debouncedSearchQuery, 20).then((books) => {
        if (books.error) {
            setSearchResults([]);
        } else {  
            setSearchResults(books);
        }
      })
      .catch((e) => {
        console.log("error:", e);
      });
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);


const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
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

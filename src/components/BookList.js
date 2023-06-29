import Book from "./Book";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";


const BookList = ({
    bookList,
    setBookList
}) => {
  const [readBooks, setReadBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  // Filtrer les livres selon leur étagère
  useEffect(() => {
    const read = bookList.filter((book) => book.shelf === "read");
    const wantToRead = bookList.filter((book) => book.shelf === "wantToRead");
    const currentlyReading = bookList.filter((book) => book.shelf === "currentlyReading");
    setReadBooks(read);
    setWantToReadBooks(wantToRead);
    setCurrentlyReadingBooks(currentlyReading);
  }, [bookList]);
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {currentlyReadingBooks.map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      bookList={bookList}
                      setBookList={setBookList}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {wantToReadBooks.map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      bookList={bookList}
                      setBookList={setBookList}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {readBooks.map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      bookList={bookList}
                      setBookList={setBookList}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  );
};
export default BookList;
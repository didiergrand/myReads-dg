import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./components/SearchPage";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";

function App() {
  // get books from bookApi
  const [bookList, setBookList] = useState([]);
  const [readBooks, setReadBooks] = useState([]);
  const [wantToReadBooks, setWantToReadBooks] = useState([]);
  const [currentlyReadingBooks, setCurrentlyReadingBooks] = useState([]);
  const [noShelfBooks, setNoShelfBooks] = useState([]);

  // Récupérer la liste des livres depuis l'API 
  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBookList(books);
    });
  }, []);
  // Filtrer les livres selon leur étagère
  useEffect(() => {
    const read = bookList.filter((book) => book.shelf === "read");
    const wantToRead = bookList.filter((book) => book.shelf === "wantToRead");
    const currentlyReading = bookList.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const noShelf = bookList.filter((book) => book.shelf === "none");
    setReadBooks(read);
    setWantToReadBooks(wantToRead);
    setCurrentlyReadingBooks(currentlyReading);
    setNoShelfBooks(noShelf);
  }, [bookList]);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookList currentlyReadingBooks={currentlyReadingBooks} wantToReadBooks={wantToReadBooks} readBooks={readBooks} bookList={bookList} setBookList={setBookList}  />} />
          <Route path="/search" element={<SearchPage noShelfBooks={noShelfBooks} bookList={bookList} setBookList={setBookList} />} />
      </Routes>
    </BrowserRouter>
      </div>
  );
}
export default App;

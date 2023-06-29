import "./App.css";
import { useState, useEffect } from "react";
import SearchPage from "./components/SearchPage";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookList from "./components/BookList";

function App() {
  // get books from bookApi
  const [bookList, setBookList] = useState([]);

  // Récupérer la liste des livres depuis l'API 
  useEffect(() => {
    BooksAPI.getAll().then((books) => {
      setBookList(books);
    });
  }, []);
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<BookList bookList={bookList} setBookList={setBookList}  />} />
          <Route path="/search" element={<SearchPage bookList={bookList} setBookList={setBookList} />} />
      </Routes>
    </BrowserRouter>
      </div>
  );
}
export default App;

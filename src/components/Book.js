const Book = ({ book, bookList, setBookList }) => {
  const onShelfChange = (book, shelf) => {
    const updatedBooks = bookList.map((sBook) => {
      if (book.id === sBook.id) {
        sBook.shelf = shelf;
      }
      return sBook;
    });
    setBookList(updatedBooks);
    localStorage.setItem('bookList', JSON.stringify(updatedBooks));   
  };
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${book.imageLinks.thumbnail})`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            onChange={(e) => onShelfChange(book, e.target.value)}
            value={book.shelf}
          >
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
      
      <div className="book-isbn">
        {book.industryIdentifiers.map((isbn) => (
            <div key={isbn.identifier}>{isbn.identifier}</div>
        ))}
      </div>
    </div>
  );
};
export default Book;

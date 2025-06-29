import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';
import ListBooks from './components/ListBooks/ListBooks';
import SearchBooks from './components/SearchBooks/SearchBooks';
import * as BookAPI from './BooksAPI';
import { useLocation } from 'react-router';

function App() {
  const location = useLocation();
  const { pathname } = location;
  const [showSearchPage, setShowSearchPage] = useState(
    pathname.includes('search')
  );
  const [books, setBooks] = useState([]);
  const [shelfBook, setShelfBook] = useState(null);
  const [shelf, setShelf] = useState('');

  //check if book includes in books shelf
  const includeBook = (bookShelf) =>
    books.some((book) => bookShelf.id === book.id);

  //check if book has the same books shelf
  const equalShelfBook = (bookShelf, shelf) =>
    books.find((book) => bookShelf.id === book.id).shelf === shelf;

  //add book to Shelf book
  const addBook = (bookShelf, shelf) => [
    ...books,
    { ...bookShelf, shelf: shelf },
  ];

  //update book on shelf
  const updateBook = (bookShelf, shelf) => {
    const noneShelfName = 'none';
    const proportiesShelf = 'shelf';
    if (shelf !== noneShelfName) {
      return Object.assign({}, bookShelf, { shelf: shelf });
    } else {
      delete bookShelf[proportiesShelf];
      console.log(bookShelf);
      return bookShelf;
    }
  };

  //fetch books form API
  async function fetchApiBook() {
    try {
      const result = await BookAPI.getAll();
      return result;
    } catch (error) {
      return error;
    }
  }

  //update book in API
  async function updateApiBook(bookShelf, shelf) {
    try {
      await BookAPI.update(bookShelf, shelf);
    } catch (error) {
      return error;
    }
  }

  //turn on/off search
  const handleSearch = () => {
    const stateSearch = !showSearchPage;
    setShowSearchPage(stateSearch);
  };

  //set current book in shelf
  function handleShelf(e, shelfBook) {
    setShelfBook(shelfBook);
    setShelf(e.target.value);
  }

  //handle API
  useEffect(() => {
    //setShowSearchPage(pathname.includes("search"));
    if (books.length === 0) {
      fetchApiBook().then((books) => {
        setBooks(books);
      });
    } else {
      if (
        books.length > 0 &&
        includeBook(shelfBook) &&
        !equalShelfBook(shelfBook, shelf)
      ) {
        updateApiBook(shelfBook, shelf).then((id_books) => {
          const updateShelfBooks = books.map((book) => {
            if (book.id === shelfBook.id) {
              return updateBook(book, shelf);
            } else {
              // No changes
              return book;
            }
          });
          setBooks(updateShelfBooks);
        });
      } else {
        updateApiBook(shelfBook, shelf).then((id_books) => {
          setBooks(addBook(shelfBook, shelf));
        });
      }
    }
  }, [shelfBook, shelf]);
  return (
    <div className="app">
      {showSearchPage ? (
        <SearchBooks
          booksShelf={books}
          handleSearchState={handleSearch}
          handleShelf={handleShelf}
        />
      ) : books.length > 0 ? (
        <ListBooks
          data={books}
          handleShelf={handleShelf}
          handleSearch={handleSearch}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;

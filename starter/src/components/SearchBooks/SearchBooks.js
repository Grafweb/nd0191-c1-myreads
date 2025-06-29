import React, { useState } from 'react';
import { Link } from 'react-router';
import * as BookAPI from '../../BooksAPI';
import Book from '../Book/Book';

export default function SearchBooks({
  booksShelf,
  handleSearchState,
  handleShelf,
}) {
  const maxResults = 20;

  //state Search
  const [booksSearch, setBooksSearch] = useState([]);
  const [loading, setLoading] = useState(false);

  //it checks book includes in state book shelfs
  const includeBook = (bookSearch) =>
    booksShelf.some((book) => book.id === bookSearch.id);

  //get current shelf
  const getIncludeBookShelf = (bookSearch) =>
    booksShelf.find((book) => book.id === bookSearch.id).shelf;

  //debounce search
  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const form = e.currentTarget.value;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(form);
      }, 1000);
    };
  };

  //handle Search
  const handleSearch = async (value) => {
    setLoading(true);
    try {
      const result = await BookAPI.search(value, maxResults).then((books) => {
        if (books && books.length > 0) {
          return books.map((book) => {
            if (includeBook(book)) {
              book.shelf = getIncludeBookShelf(book);
              return book;
            } else {
              return book;
            }
          });
        } else {
          return books;
        }
      });
      setLoading(false);
      setBooksSearch(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" onClick={handleSearchState} to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            onChange={debounce((e) => {
              handleSearch(e);
            })}
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {loading ? (
            <li>Loading...!</li>
          ) : booksSearch && booksSearch.length > 0 ? (
            booksSearch.map((book) => (
              <Book key={book.id} book={book} handleShelf={handleShelf} />
            ))
          ) : (
            <li>Nothing found!</li>
          )}
        </ol>
      </div>
    </div>
  );
}

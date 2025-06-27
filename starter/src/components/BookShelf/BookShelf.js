import React from 'react';
import PropTypes from 'prop-types';
import Book from '../Book/Book';

export default function BookShelf({ books, shelfTitle, shelfId, handleShelf }) {
  //filter shelf by id
  const shelfBooks = books.filter((book) => book.shelf === shelfId);
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {shelfBooks.map((book) => (
            <Book key={book.id} book={book} handleShelf={handleShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
};

BookShelf.defaultProps = {
  shelfTitle: 'Currently Reading',
};

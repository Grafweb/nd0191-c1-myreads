import React from 'react';
import PropTypes from 'prop-types';


const Book = ({book, handleShelf}) => (
    <li key={book.id}>
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={ book.imageLinks ? {
                        width: 128,
                        height: 193,
                        backgroundImage:
                            'url(' + book.imageLinks.thumbnail + ')',
                    } : {
                        width: 128,
                        height: 193
                    }}
                ></div>
                <div className="book-shelf-changer">
                    <select value={book.shelf} onChange={e => handleShelf(e, book)}>
                        <option value="none" disabled>
                            Move to...
                        </option>
                        <option value="currentlyReading">
                            Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{(book.authors && book.authors.length > 0) ? book.authors.map((author) => (author)) : ''}</div>
        </div>
    </li>
);

Book.propTypes = {
    book: PropTypes.object.isRequired,
    handleShelf: PropTypes.func.isRequired,
};

Book.defaultProps = {
    book: null,
};

export default Book;

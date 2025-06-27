import BookShelf from "../BookShelf/BookShelf";
import * as PropTypes from "prop-types";
import { Link } from "react-router";

const shelfTitle = ['Currently Reading', 'Want to Read', 'Read'];
const shelfId = ['currentlyReading', 'wantToRead', 'read'];

export default function ListBooks({data, handleShelf, handleSearch}) {

    return (<div className="list-books">
        <div className="list-books-title">
            <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
            <div>
                <BookShelf books={data} handleShelf={handleShelf} shelfTitle={shelfTitle[0]} shelfId={shelfId[0]}/>
                <BookShelf books={data} handleShelf={handleShelf} shelfTitle={shelfTitle[1]} shelfId={shelfId[1]}/>
                <BookShelf books={data} handleShelf={handleShelf} shelfTitle={shelfTitle[2]} shelfId={shelfId[2]}/>
            </div>
        </div>
        <div className="open-search">
            <Link to="/search" onClick={handleSearch}>Add a book</Link>
        </div>
    </div>);
}


ListBooks.propTypes = {
    data: PropTypes.array.isRequired,
    handleShelf: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired
};

ListBooks.defaultProps = {
    data: [],
};

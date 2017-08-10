import PropTypes from "prop-types"
import React from "react"
import BookSummary from "./BookSummary";

function BookShelf({title, books, shouldDisplayWhenEmpty, onUpdateBookShelf}) {
  if (!shouldDisplayWhenEmpty && (!books || books.length === 0)) {
    return null;
  }
  return <div className="bookshelf">
    {title && <h2 className="bookshelf-title">{title}</h2>}
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map(book => <li key={book.id}>
          <BookSummary book={book} onUpdateBookShelf={onUpdateBookShelf}/>
        </li>)}
      </ol>
    </div>
  </div>
}

BookShelf.PropTypes = {
  title: PropTypes.string,
  books: PropTypes.array,
  shouldDisplayWhenEmpty: PropTypes.bool,
  onUpdateBookShelf: PropTypes.func.isRequired
};

export default BookShelf;

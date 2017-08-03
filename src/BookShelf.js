import PropTypes from "prop-types"
import React from "react"
import BookSummary from "./BookSummary";

function BookShelf({books, title, onUpdateBookShelf}) {
  return <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
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
  books: PropTypes.array,
  title: PropTypes.string
};

export default BookShelf;

import PropTypes from "prop-types"
import React from "react"
import ShelfType from "./ShelfType"

function BookSummary({book, onUpdateBookShelf}) {
  return <div className="book">
    <div className="book-top">
      <div className="book-cover" style={
        {width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")`}
      }/>
      <div className="book-shelf-changer">
        <select value={book.shelf} onChange={event => {
          onUpdateBookShelf(book, event.target.value);
        }}>
          <option value="moveTo" disabled>Move to...</option>
          {
            ShelfType.all.map(shelfType =>
              <option key={shelfType.id} value={shelfType.id}>
                {shelfType.name}
              </option>
            )
          }
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">{book.authors.join(', ')}</div>
  </div>
}

BookSummary.propTypes = {
  book: PropTypes.object.isRequired
};


export default BookSummary;

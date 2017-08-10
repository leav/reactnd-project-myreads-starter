import React from "react";
import ShelfType from "./ShelfType";
import BookShelf from "./BookShelf";
import * as BooksAPI from "./BooksAPI";
import sortBy from "sort-by";
import {Link} from "react-router-dom";


class BookList extends React.Component {
  state = {
    books: []
  };

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(this.state);
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books: books.sort(sortBy('title'))
      });
    });
  }

  render() {
    return (<div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      {
        ShelfType.displayed.map(shelfType => <BookShelf
          key={shelfType.id}
          title={shelfType.name}
          books={this.state.books.filter(book =>
            book.shelf === shelfType.id
          )}
          shouldDisplayWhenEmpty="true"
          onUpdateBookShelf={this.updateBookShelf}
        />)
      }
      <div className="open-search">
        <Link to={this.props.searchRoute}>
          Add a book
        </Link>
      </div>
    </div>);
  }
}

export default BookList;

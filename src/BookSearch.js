import React from "react";
import {Link} from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import sortBy from "sort-by"
import ShelfType from "./ShelfType"
import BookShelf from "./BookShelf";
import _ from "underscore"
import Halogen from "halogen"

class BookSearch extends React.Component {

  state = {
    books: [],
    query: '',
    isLoading: false
  };

  // Cannot use _.debounce directly in updateQuery() according to
  // http://blog.revathskumar.com/2016/02/reactjs-using-debounce-in-react-components.html
  searchQuery = _.debounce(query => {
    BooksAPI.search(query).then((queriedBooks) => {
      if (queriedBooks.error) {
        console.log(queriedBooks.error);
        this.setState({
          books: [],
          isLoading: false
        })
      } else {
        Promise.all(queriedBooks.map(book =>
          BooksAPI.get(book.id)
        )).then(books => {
          console.log(books);
          this.setState({
            books: books.sort(sortBy('title')),
            isLoading: false
          })
        });
      }
    });
  }, 300);

  updateQuery(query) {
    this.setState({
      query: query,
      isLoading: query.length > 0,
    });
    if (query.length > 0) {
      this.searchQuery(query);
    }
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      book.shelf = shelf;
      this.setState(this.state);
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={this.props.listRoute} className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
                   placeholder="Search by title or author"
                   value={this.props.query}
                   autoFocus
                   onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.isLoading &&
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Halogen.PulseLoader color="#26A65B" size="16px" margin="4px"/>
          </div>
          }
          <BookShelf
            books={this.state.books.filter(book =>
              !ShelfType.isDisplayed(book.shelf)
            )}
            onUpdateBookShelf={this.updateBookShelf}
          />
          {
            ShelfType.displayed.map(shelfType => <BookShelf
              key={shelfType.id}
              title={shelfType.name}
              books={this.state.books.filter(book =>
                book.shelf === shelfType.id
              )}
              onUpdateBookShelf={this.updateBookShelf}
              shouldDisplayWhenEmpty={false}
            />)
          }
        </div>
      </div>
    );
  }
}

export default BookSearch;

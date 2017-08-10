import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import BookList from "./BookList";
import BookSearch from "./BookSearch";
import {formatURL} from "./FormatURL"

class BooksApp extends React.Component {
  render() {
    // React router needs the "process.env.PUBLIC_URL" to work under gh-page.
    return (
      <div className="app">
        <Route exact path={formatURL('/')} render={() => (
          <BookList searchRoute={formatURL('/search')}/>
        )}/>
        <Route path={formatURL('/search')} render={() => (
          <BookSearch listRoute={formatURL('/')}/>
        )}/>
      </div>
    );
  }
}

export default BooksApp

import React from 'react'
import './App.css'
import {Route} from 'react-router-dom'
import BookList from "./BookList";
import BookSearch from "./BookSearch";

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <BookList searchRoute="/search"/>
        )}/>
        <Route path="/search" render={() => (
          <BookSearch listRoute="/"/>
        )}/>
      </div>
    );
  }
}

export default BooksApp

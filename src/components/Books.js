import React, {Component} from 'react';
import books from '../books';

function Book(book) {
  return (
    <div key={book.isbn} className="mb-2 row">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{book.title}</h5>
          <hr className="my-4"/>
          <p className="card-text">{book.description}</p>
        </div>
      </div>
    </div>
  )
}

class Books extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books,
    };
  }

  render() {
    const {books} = this.state;
    return (
      <div>
        {books.map((book) => (Book(book)))}
      </div>
    )
  }
}

export default Books;

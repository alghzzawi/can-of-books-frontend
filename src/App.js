import React from "react";
import axios from "axios";
import BestBooks from './BestBooks'

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BooksArr: [],
    };
  }

  componentDidMount = () => {
    axios
      .get(`http://localhost:3051/books`)
      .then((result) => {
        this.setState({
          BooksArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addBook = (event) => {
    event.preventDefault();

    const booksObj = {
      bookTitle: event.target.booktitle.value,
      bookDescription: event.target.bookdescription.value,
      bookStatus: event.target.bookstatus.value,
    };

    axios
      .post("http://localhost:3051/addBook", booksObj)
      .then((result) => {
        this.setState({
          BooksArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  deleteBook = (id) => {
    axios
      .delete(`http://localhost:3051/deleteBook/${id}`)
      .then((result) => {
        this.setState({
          BooksArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <>
        {/* <div>Books</div>

        <form onSubmit={this.addBook}>
          <input type="text" name="booktitle" placeholder="Book Title" />
          <input
            type="text"
            name="bookdescription"
            placeholder="Book Description"
          />
          <input type="text" name="bookstatus" placeholder="Book Status" />
          <button type="submit">Add</button>
        </form>

        {this.state.BooksArr.map((item, index) => {
          return (
            <>
              <div key={index}>
                <h4>Book title : {item.title} </h4>
                <p>book description: {item.description}</p>
                <p>movie status : {item.status}</p>
                <button onClick={() => this.deleteBook(item._id)}>
                  Delete Book
                </button>
                <p>________________________________________</p>
              </div>
            </>
          );
        })} */}
        <BestBooks/>
        

      </>
    );
  }
}

export default Books;

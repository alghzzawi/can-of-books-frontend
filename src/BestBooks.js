import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import "./BestBooks.css";
import SelectBook from "./SelectBook";
import SelectBookUpdate from "./SelectBookUpdate";
import { withAuth0 } from '@auth0/auth0-react';

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BooksArr: [],
      bookShowModal: false,
      updateShowModal: false,
      bookChosen: [],
    };
  }

  componentDidMount = () => {
    const { user } = this.props.auth0;


    axios
      .get(`http://localhost:3001/books/${user.email}`)
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
    const { user } = this.props.auth0;

    const booksObj = {
      bookTitle: event.target.booktitle.value,
      bookDescription: event.target.bookdescription.value,
      bookStatus: event.target.bookstatus.value,
      email : user.email,
      name : user.name
    };

    axios
      .post(`http://localhost:3001/addBook/${user.email}`, booksObj)
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
    const { user } = this.props.auth0;
    axios
      .delete(`http://localhost:3001/deleteBook/${id}/${user.email}`)
      .then((result) => {
        this.setState({
          BooksArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleShow = () => {
    this.setState({
      bookShowModal: true,
    });
  };
  handleClose = () => {
    this.setState({
      bookShowModal: false,
      updateShowModal: false,
    });
  };

  openFormModal = (bookChosen) => {
    this.setState({
      updateShowModal: true,
      bookChosen: bookChosen,
    });
  };

  updateBook = (event) => {
    event.preventDefault();
    const { user } = this.props.auth0;

    const booksObj = {
      title: event.target.bookTitle.value,
      description: event.target.bookDescription.value,
      status: event.target.bookStatus.value,
      email : user.email,
      name : user.name
    };

    const id = this.state.bookChosen._id;
    // console.log(id);

    axios
      .put(`http://localhost:3001/updateBook/${id}/${user.email}`, booksObj)
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
        {/* <form onSubmit={this.addBook}>
          <input type="text" name="booktitle" placeholder="Book Title" />
          <input
            type="text"
            name="bookdescription"
            placeholder="Book Description"
          />
          <input type="text" name="bookstatus" placeholder="Book Status" />
          <button type="submit">Add</button>
        </form> */}

        <Button variant="info" onClick={this.handleShow} id="addButton">
          Add Book
        </Button>

        <SelectBook
          show={this.state.bookShowModal}
          handleClose={this.handleClose}
          addBook={this.addBook}
        />

        <Carousel>
          {this.state.BooksArr.length ? (
            this.state.BooksArr.map((item, index) => {
              return (
                <Carousel.Item id="labData" key={index}>
                  <img src={require("./img/download.jpg")} alt={item.title} />
                  <Carousel.Caption>
                    <h4>Book title : {item.title} </h4>
                    <p>book description: {item.description}</p>
                    <p>movie status : {item.status}</p>
                    <Button onClick={() => this.deleteBook(item._id)}>
                      Delete Book
                    </Button>
                    <Button onClick={() => this.openFormModal(item)}>
                      Update Book
                    </Button>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })
          ) : (
            <h1>No Books Found</h1>
          )}
        </Carousel>

        <SelectBookUpdate
          show={this.state.updateShowModal}
          handleClose={this.handleClose}
          updateBook={this.updateBook}
          bookChosen={this.state.bookChosen}
        />
      </>
    );
  }
}

export default withAuth0(Books);

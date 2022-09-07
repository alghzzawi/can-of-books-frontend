import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import "./BestBooks.css";
import SelecedBook from "./SelecedBook";

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BooksArr: [],
      show:false
    };
  }

  componentDidMount = () => {
    axios
      .get(`http://localhost:3001/books`)
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
      .post("http://localhost:3001/addBook", booksObj)
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
      .delete(`http://localhost:3001/deleteBook/${id}`)
      .then((result) => {
        this.setState({
          BooksArr: result.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleShow  = () => {
    this.setState({
      show:true,
    })

  }
  handleClose=()=>{
    this.setState({
      show:false
    })
  }



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

        

        <Button variant="info" onClick={this.handleShow} id="addButton" >Add Book</Button>

        <SelecedBook show={this.state.show} handleClose={this.handleClose} addBook={this.addBook} />


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
                    <button onClick={() => this.deleteBook(item._id)}>
                      Delete Book
                    </button>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })
          ) : (
            <h3>No Books Found</h3>
          )}
        </Carousel>
      </>
    );
  }
}

export default Books;

import React from "react";
import axios from "axios";
import Carousel from "react-bootstrap/Carousel";

class BestBooks extends React.Component {
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
        console.log(result.data);
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
        {this.state.BooksArr.length ? (
          <Carousel>
            {this.state.BooksArr.map((item) => {
              return (
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHYApAMBIgACEQEDEQH/xAAcAAEAAgMBAQEAAAAAAAAAAAAABAYBAgUHAwj/xAA+EAACAQIBCAcDCQkBAAAAAAAAAQIDEQQFBhMhQVGU4QcSFzFCUoEUYXEVIiMyU4SRoeIlM0Nic7GywfAW/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APDQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABvZBRvsN7H3pwsgI+ie4aN7iaovcbxpdbYBztHLcY0b3HW9nTW38DeODexfkByFSb2G8cNJ7DvUsCm7aiXRydFyWpMCsrCyfhNvY35WXOjkhN6okuGRY/y/jcCg+xy8ph4OW49I/wDPQaTjKF90tRpLN+LT+rdbAPOvZJbjHssvKXyrkWEHrnTXxkQqmTacXa8PQCnPCyXhNHQkthbZ5Oi1qaINbBRT1/3Ar+ie4aJ7jrzw0V3XNdAv+QHK0T3GHC2w6c6diNVgtepgQ7A2a1gDKeskUqmwvlHoYzvrUYVYQwHVnFSV8TsevcfRdCueK8GA4nkBSI1HbUvzN9LLcr/Eu66Gc8V/CyfxPIPoZzx2U8AvvXICmU6zv85IkRrwWvq3LWuhnPPyYHiuRsuhvPPbDAcVyArVDFR+zS997kqGLV++3xO32O55rwYDiuRnsfz0WvqYDiuQHLp4uC70viyR8oLVerG265PXRDnmn+7wHFfpHZHnn9ngPTF8gInyrGPjfoayyzTWyb9UTuyTPT7PA8X+kPojz1erqYBfev0gcupliD16JP1RFrZQjLwpeh2ux/PR+DAcVyMdjuenkwPFcgK68bHzW9x8KlaMvFrLR2OZ6eTAcTyM9juenkwHE8gKfUqK1uv3Hx0q8yLpLoazzfhwHE8jXsXzy8uA4nkBSKk791l6kSrL3/megvoWzyfhwHE8jV9CeeL8GA4nkB5w3rB6P2JZ4+XAcTyAH6OyUv2ZhP6EP8USgAAAAAADnZSwNXGTi4YudFJalHzbH37CJ8kYty67yrW0mpdZXXd7r21/DeYAH1nkrFNprKVa6Ss2367dtvQzRyXiqTqv5RqTlVhGLco7Yt/O1Pvfc7elgANsPk7FQrRqVMpVpqMk+q72a3Wvt/2b4nJ2lqxqwqdWpFQXXa1tRkpO7TV72S92sACJDIU/o3LH1oyi0/o0ko2v9VO9ld+/cavN+o2r5RrySpxhaavbqvvWv0d73TktoAHawtJUMNSoqUp6OKj1pO7dtrPqAAAAAAAAAB//2Q=="
                    alt={item.title}
                  />
                  <Carousel.Caption>
                    <h4>Book title : {this.props.booksArr.item.title} </h4>
                    <p>book description: {item.description}</p>
                    <p>movie status : {item.status}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        ) : (
          <h3>No Books Found</h3>
        )}
      </>
      
    );
  }
}

export default BestBooks;

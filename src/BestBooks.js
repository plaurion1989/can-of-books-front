import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
  async componentDidMount() {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: { "Authorization": `Bearer ${jwt}` }
    };
    let bookData = await axios.get(`http://localhost:3001/books`, config);
    console.log(bookData);
    this.setState({bookData: bookData.data})
  }


render() {
  return (
    <>
    <h1>My Favorite Books</h1>
    <Carousel>
      {this.state? this.state.bookData.map(book =><Carousel.Item key={book._id}>
          <Carousel.Caption>
          <h2>{book.name}</h2>
          <h4>{book.description}</h4>
          <p>{book.status}</p>
          <p>{book.email}</p>
          </Carousel.Caption>
      </Carousel.Item>): ''}
    </Carousel>
    </>
  )
}
}


export default withAuth0(MyFavoriteBooks);

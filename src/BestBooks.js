import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class MyFavoriteBooks extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      bookData:[],
    }
  }
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
  let captionStyle= {
    paddingTop: '200px'
  }
  return (
    <>
      {console.log(this.state.bookData)}
    <h1>My Favorite Books</h1>
    <Carousel>
    {this.state.bookData ? this.state.bookData.map(book =>(
      <Carousel.Item key={book._id}>
        <img
          className="d-block w-100"
          src={`https://via.placeholder.com/800x400/000000/FFFFFF/?text=${book.name}`}
          alt={book.status}
        />
          <Carousel.Caption style={captionStyle}>
          <h2>{book.description}</h2>
          {/* <p>{book.status}</p> */}
          <p>{book.email}</p>
          </Carousel.Caption>
      </Carousel.Item>)): ''}
    </Carousel>
    </>
  )
}
}


export default withAuth0(MyFavoriteBooks);

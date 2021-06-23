import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Carousel, Button} from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import BookFormModal from './BookFormModal.js'


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      showModal: false
    }
  }
  
//-----------------Config Function to make life Easy-------------

  getConfig = async () => {
    const { getIdTokenClaims } = this.props.auth0;
    let tokenClaims = await getIdTokenClaims();
    const jwt = tokenClaims.__raw;

    const config = {
      headers: { "Authorization": `Bearer ${jwt}` }
    };
    return config;
  }
  //-------------------Get Stuff in Carousel---------------------


  async componentDidMount() {
    let config = await this.getConfig();
    let bookData = await axios.get(`http://localhost:3001/books`, config);
    console.log(bookData);
    this.setState({ bookData: bookData.data })
  }
  //---- secret entry for modal ----
  toggleShow = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }


  //---------------------Add Stuff From Modal-----------------------



  onSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.description.value);
    let data = {
      name: e.target.name.value,
      description: e.target.description.value
    }
    let config = await this.getConfig();
    const responseData = await axios.post('http://localhost:3001/books', data, config);
    let updatedArray = this.state.bookData;
    updatedArray.push(responseData.data);
    this.setState({ bookData: updatedArray });
    this.toggleShow();
  };


  //--------------------Delete Stuff from Carousel------------------


  

  //--------------------Render EVERYTHING Here!!!-------------------

  render() {
    let captionStyle = {
      paddingTop: '200px'
    }
    return (
      <>
        {console.log(this.state.bookData)}
        <h1>My Favorite Books</h1>
        <Carousel>
          {this.state.bookData ? this.state.bookData.map(book => (
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
            </Carousel.Item>)) : ''}
        </Carousel>
        <BookFormModal showModal={this.state.showModal} toggleShow={this.toggleShow} onSubmit={this.onSubmit} />

        <button onClick={this.toggleShow}>Add a Book!</button>
      </>
    )
  }

};
export default withAuth0(MyFavoriteBooks);

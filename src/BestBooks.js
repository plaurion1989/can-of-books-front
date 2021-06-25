import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Carousel, Button } from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import BookFormModal from './BookFormModal.js'
import UpdateForm from './UpdateForm.js'


class MyFavoriteBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      showModal: false,
      showUpdateModal: false,
      indexOfMap: 0
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
  toggleUpdateShow = (i) =>
      this.setState({
        showUpdateModal: !this.state.showUpdateModal,
        indexOfMap: i
      });
  



  //---------------------Add Stuff From Modal-----------------------
  bookDataArr = () => {
    let data = this.bookData
    console.log(data)
  }

  onSubmit = async (e) => {
    e.preventDefault();
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


  deleteBook = async (id) => {
    let config = await this.getConfig();
    let response = await axios.delete(`http://localhost:3001/books/${id}`, config);
    console.log(response);
    let updatedArray = this.state.bookData.filter(book => book._id !== id);
    this.setState({ bookData: updatedArray });
  }


  //----------------------Update Books Here-------------------------

    updateBook = (bookInfo) => {
      console.log(bookInfo);
      this.setState({
        bookToUpdate: bookInfo
      })
    }
 

    sendBookUpdate = async (e) => {
      e.preventDefault();
      let config = await this.getConfig();
      let dataToUpdate = {
        name: e.target.updateName.value,
        description: e.target.updateDescription.value
      };
      let response = await axios.put(`http://localhost:3001/books/${e.target.bookId.value}`, dataToUpdate, config);
      console.log(response);
      let updatedArray = this.state.bookData.filter(book => book._id !== e.target.bookId.value);
      updatedArray.push(response.data);
      this.setState({ 
        bookData: updatedArray,
        bookToUpdate: {} 
      });
      this.toggleUpdateShow();
    }



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
          {this.state.bookData ? this.state.bookData.map((book, i) => (
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

                <Button variant="danger" onClick={() => this.deleteBook(book._id)}>Burn Book!</Button>


          <Button onClick={() => this.toggleUpdateShow(i)}>Update This Book!</Button>

              </Carousel.Caption>
            </Carousel.Item>)) : ''}
        </Carousel>
        <BookFormModal showModal={this.state.showModal} toggleShow={this.toggleShow} onSubmit={this.onSubmit} />

        <Button onClick={this.toggleShow}>Add a Book!</Button>
        <UpdateForm 
        showUpdateModal={this.state.showUpdateModal} 
        toggleUpdateShow={this.toggleUpdateShow} 
        sendBookUpdate={this.sendBookUpdate} 
        book={this.state.bookData[this.state.indexOfMap]}/>
      </>
    )
  }

};
export default withAuth0(MyFavoriteBooks);

import React from 'react';
import {Form, Modal, Button} from 'react-bootstrap'

class UpdateForm extends React.Component{

  render(){
    return(
      <>
        <Modal show={this.props.showUpdateModal}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Update a Book in your book library!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) =>this.props.sendBookUpdate(e)}>
                <Form.Group controlId="updateName">
                  <Form.Label>Change Book Name</Form.Label>
                  <Form.Control type="string" defaultValue={this.props.book? this.props.book.name: ''} />
                </Form.Group>
                <Form.Group controlId="updateDescription">
                  <Form.Label>Change Book Description</Form.Label>
                  <Form.Control type="string" defaultValue={this.props.book?this.props.book.description:''} />
                </Form.Group>
                <Form.Group controlId="bookId"><Form.Control type="hidden"defaultValue={this.props.book?this.props.book._id:''}></Form.Control></Form.Group>
              <Button variant="primary" type="submit">Update this Book!</Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.props.toggleUpdateShow}>
            Nevermind
          </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </>
    )
  }
}
export default UpdateForm;
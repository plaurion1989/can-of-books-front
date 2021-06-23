import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal, Button, Form} from 'react-bootstrap';
import { withAuth0 } from '@auth0/auth0-react';



class BookFormModal extends React.Component {

  render() {
    return (
      <>
        <Modal show={this.props.showModal}>
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Add a Book into your book library!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.props.onSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>New Book Name</Form.Label>
                  <Form.Control type="string" placeholder="Enter Book Name Here!" />
                </Form.Group>
                <Form.Group controlId="description">
                  <Form.Label>Briefly Describe the Book</Form.Label>
                  <Form.Control type="string" placeholder="Enter Description Here!" />
                </Form.Group>
              <Button variant="primary" type="submit">Add the Book!</Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.props.toggleShow}>
            Nevermind
          </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </>
    )
  }
}

export default withAuth0(BookFormModal);
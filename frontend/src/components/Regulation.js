import React, { Component } from 'react';
import { 
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

class Regulation extends Component {
state = {
  modal: false
}

toggle = () => {
  this.setState({
    modal: !this.state.modal
  });
}

render() {
  return (
    <MDBContainer>
      <MDBBtn color="red" onClick={this.toggle}>Show Regulations</MDBBtn>
      <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
        <MDBModalHeader toggle={this.toggle}>Regulation</MDBModalHeader>
        <MDBModalBody>
          Opis bla bla bla
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="dark" onClick={this.toggle}>Close</MDBBtn>
          
        </MDBModalFooter>
      </MDBModal>
    </MDBContainer>
    );
  }
}

export default Regulation;
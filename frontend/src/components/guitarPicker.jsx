import React, { Component } from "react";
import {
    MDBIcon,
    MDBCardImage,
    MDBCardTitle,
    MDBCard,
    MDBBtn,
    MDBCol,
    MDBRow,
    MDBCardBody,
} from "mdbreact"

class GuitarPicker extends Component {
    constructor(props) {
    super(props);
    this.state = {
        guitars: this.props.guitars,
    };
  }

  makeGuitarsRow() {
    return <MDBRow id="guitars">
        {this.gatherAllGuitarsCols()}
        </MDBRow>;
  }

  gatherAllGuitarsCols() {
    let tmp = [];
    for( var j=0; j<this.state.guitars.length; j++)
      if(this.state.guitars[j].guitars_type === this.props.category)
        tmp.push(this.makeGuitarsCard(this.state.guitars[j]));
    return tmp;    
  }

  makeGuitarsCard(guitars) {
    return (
    <MDBCol sm="6" md="4" lg="3">
        <MDBCard cascade className="my-3 mx-0 px-0 grey lighten-4">
          <MDBCardImage
            cascade
            className="img-fluid"
            src="https://mdbootstrap.com/img/Marketing/mdb-press-pack/mdb-main.jpg"
            style={{margin: "auto"}}
          />
          <MDBCardBody cascade className="text-center">
            <MDBCardTitle>
              <MDBIcon icon="guitar" className="mdb-color-text pr-2" />
              <span className="text-capitalize">{guitars.model}</span><br/>
            </MDBCardTitle>
              <p className="m-0 text-left">Producent: <strong>{guitars.brand[0].toUpperCase()+guitars.brand.slice(1)}</strong> </p>
              <p className="m-0 text-left">Cena: <strong>{guitars.price}</strong> zł</p>
              <p style={{"fontSize": "80%"}} className="m-0 p-0 text-right">Sprzedawca: <strong>{guitars.owner.username}</strong></p>
            <MDBBtn 
                href={"/guitars/"+guitars.id}
                color="mdb-color"
              >
                Obejrz
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
    </MDBCol>
    );
  }

  render() {
    return this.makeGuitarsRow();
  }
}

export default GuitarPicker;
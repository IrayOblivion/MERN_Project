import React, { Component } from "react";
import axios from "axios";
import { 
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBBtnGroup,
    MDBIcon} from "mdbreact";
import {Redirect} from "react-router-dom";
    
class UserOffers extends Component {
  constructor(props) {
      super(props);
      this.state = {
          offers: [],
          redirectToLogin: false,
          readyToRender: false
      };
  }

  componentDidMount() {
    axios.post("http://localhost:4000/profile/offers", null ,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" }).then(response => {
      console.log(response.data);
      if(response.data.valid === false)
        this.setState({redirectToLogin: true});
      else
        this.setState({offers: response.data.offers, readyToRender: true});
    });
  }
    
  handleDelete = (event) => {
    event.preventDefault();
    axios.post("http://localhost:4000/profile/offer/remove/"+event.target.value, null,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
    .then(response => {
        this.setState({redirectToOfferList: true})
    });
  }
  
  renderOffers() {
    let tmp = []
    if(this.state.offers.length == 0)
        return <p>Nie utworzono żadnej oferty.</p>
    this.state.offers.forEach(offer => {
    let time = new Date(offer.published);
      tmp.push(
        <div className="m-0 mx-1 px-2 mt-1 z-depth-1">
          <MDBRow className="m-0 w-100">
             <MDBCol className="my-auto mr-auto text-left grey-text" style={{"white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis"}}>Id: {offer.id}</MDBCol>
             <MDBCol className="my-auto text-right" style={{"white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis"}}>Utw.: {time.toDateString()}</MDBCol>
            </MDBRow>
            <hr className="my-1"/>
          <MDBRow className="m-0 w-100">
            <MDBCol className="my-auto mr-auto" xs="10" style={{"white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis"}}>Model: <strong>{offer.model}</strong></MDBCol>
          </MDBRow>
          <MDBRow className="m-0 w-100">
          <MDBCol className="text-right">
            <MDBBtnGroup>
              <MDBBtn size="sm" color="mdb-color" className="py-2 px-2" href={"/profile/offers/"+offer.id}><MDBIcon size="sm" icon="info-circle"></MDBIcon></MDBBtn>
              <MDBBtn size="sm" color="grey" className="py-2 px-2" href={"/profile/offers/edit/"+offer.id}><MDBIcon size="sm" icon="cog"></MDBIcon></MDBBtn>
              <MDBBtn size="sm" color="black" value={offer.id} onClick={this.handleDelete} className="py-2 px-2"><MDBIcon size="sm" icon="times"></MDBIcon></MDBBtn>
              </MDBBtnGroup>
              </MDBCol>
          </MDBRow>
        </div>
      )
    });
    return tmp;
  }

  render() {
    if(!this.state.redirectToLogin && this.state.offers !== null)
      return (
        <div className="pt-5" style={{"minHeight": "100%"}}>
        <MDBRow className="pt-5 w-100 mx-0">
          <MDBCol lg="8" md="10" sm="12" className="mx-auto p-5 z-depth-1">
            <p>Oferty</p>
            {this.renderOffers()}
            <hr className="hr-dark"/>
            <MDBRow>
                <MDBCol className="text-center">
                    <MDBBtn color="mdb-color" className="py-2 px-2" href={"/profile"}><MDBIcon className="mr-1" icon="chevron-left"></MDBIcon>cofnij</MDBBtn>
                </MDBCol>
                <MDBCol className="text-center">
                    <MDBBtn color="grey" className="py-2 px-2" href={"/profile/offers/new"}><MDBIcon className="mr-1" size="sm" icon="plus"></MDBIcon>Dodaj ofertę</MDBBtn>
                </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
        </div>
      );     
    if(this.state.redirectToLogin)
      return <Redirect to="/login"/>;
    else
      return("");
  }
}
export default UserOffers;
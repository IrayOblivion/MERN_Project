import React, { Component } from "react";
import axios from "axios";
import { 
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBBtnGroup,
    MDBIcon} from "mdbreact";
import {Redirect} from "react-router-dom";
    
class Profile extends Component {
  constructor(props) {
      super(props);
      this.state = {
          user: null,
          redirectToLogin: false,
          readyToRender: false
      };
  }

  componentDidMount() {
    axios.post("http://localhost:4000/profile", null ,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" }).then(response => {
      console.log(response.data.user)
      if(response.data.valid === false)
        this.setState({redirectToLogin: true});
      else
        this.setState({user: response.data.user, offers: response.data.user.offers, readyToRender: true});
    });
  }
    
  renderOffers() {
    let tmp = []
    this.state.offers.forEach(offer => {
      tmp.push(
        <div className="m-0 mx-1 px-2 mt-1 z-depth-1">
          <MDBRow className="m-0 w-100">
            <MDBCol className="my-auto mr-auto" xs="11" style={{"white-space": "nowrap", "overflow": "hidden", "text-overflow": "ellipsis"}}>{offer.model}</MDBCol>
            <MDBCol xs="1" className="text-right">
            <MDBBtnGroup>
              <MDBBtn size="sm" color="mdb-color" className="py-2 px-2" href={"/profile/offers/"+offer.id}><MDBIcon size="sm" icon="info-circle"></MDBIcon></MDBBtn>
              <MDBBtn size="sm" color="grey" className="py-2 px-2" href={"/profile/offers/edit/"+offer.id}><MDBIcon size="sm" icon="cog"></MDBIcon></MDBBtn>
              </MDBBtnGroup>
              </MDBCol>
          </MDBRow>
        </div>
      )
    });
    return tmp;
  }

  render() {
    if(!this.state.redirectToLogin && this.state.user !== null)
      return (
        <div className="pt-5" style={{"minHeight": "100%"}}>
        <MDBRow className="pt-5 w-100 mx-0">
          <MDBCol lg="8" md="10" sm="12" className="mx-auto p-5 z-depth-1">
            <p className="display-4">Twoje konto</p>
            <hr className="hr-dark"/>
            <MDBRow>
              <MDBCol sm="12" md="6">
                <div>
                  <img  className="w-25" src={require("../assets/avatar.png")} alt="Avatar" style={{"borderRadius": "50%"}}/> 
                </div>
                <div>
                  <p className="m-0 mt-1" style={{"fontSize":"130%"}}>Dane użytkownika</p>
                  <p className="m-0 ml-2">{this.state.user.username}</p>
                  <p className="m-0 ml-2">{this.state.user.firstName} {this.state.user.lastName}</p>
                </div>
                <hr/>
                <div>
                  <p className="m-0 mt-1" style={{"fontSize":"130%"}}>Dane adresowe</p>
                  <p className="m-0 ml-2">{this.state.user.address}</p>
                  <p className="m-0 ml-2">{this.state.user.place} {this.state.user.postCode}</p>
                </div>
                <hr/>
                <div>
                  <p className="m-0 mt-1" style={{"fontSize":"130%"}}>Dane kontaktowe</p>
                  <p className="m-0 ml-2">{this.state.user.tel}</p>
                  <p className="m-0 ml-2">{this.state.user.email}</p>
                </div>
                
              </MDBCol>
              <MDBCol sm="12" md="6">
                <div>
                  <p className="m-0 mt-1" style={{"fontSize":"130%"}}>Moje oferty</p>
                  {this.renderOffers()}
                </div>
                <hr/>
                <div>
                  <MDBRow class="m-0 mt-1 w-100">
                    <MDBCol className="text-center"><MDBBtn href="/profile/offers" color="mdb-color"><MDBIcon className="mr-1" icon="list"/>Oferty</MDBBtn></MDBCol>
                    <MDBCol className="text-center"><MDBBtn href="/profile/offers/new" color="grey"><MDBIcon className="mr-1" icon="plus"/>Dodaj</MDBBtn></MDBCol>
                  </MDBRow>
                </div>
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
export default Profile;
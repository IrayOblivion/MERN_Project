import React, { Component } from "react";
import axios from "axios";
import { 
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBIcon} from "mdbreact";
import {Redirect} from "react-router-dom";

class UserDetailsOffer extends Component {
  constructor(props) {
      super(props);
      this.state = {
          redirectToLogin: false,
          readyToRender: false,
          offer: {}
      };
  }

    componentDidMount() {
      axios.post("http://localhost:4000/profile/offer/"+this.props.match.params.id, null ,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
      .then(response => {
          console.log("dupa")
          console.log(response)
          if(response.data.valid === false)
            this.setState({redirectToLogin: true});
          else {
              this.setState({offer: response.data.offer, readyToRender: true});
          }
      });
    }

    renderOffer = () => {
        let tmp = [];
        for(var key in this.state.offer) {
            if(key == "id")
                continue;
            if(key == "switch") {
                if(this.state.offer.switch)
                    tmp.push(
                        <>
                        <MDBRow>
                        <MDBCol><strong>{key}</strong></MDBCol>
                        <MDBCol>Tak</MDBCol>
                        </MDBRow>
                        <hr/>
                        </>
                    )
                else
                    tmp.push(
                        <>
                        <MDBRow>
                        <MDBCol><strong>{key}</strong></MDBCol>
                        <MDBCol>Brak</MDBCol>
                        </MDBRow>
                        <hr/>
                        </>
                    )
                continue;
            }

            if(this.state.offer[key] == null)
                tmp.push(
                    <>
                    <MDBRow>
                    <MDBCol><strong>{key}</strong></MDBCol>
                    <MDBCol>--</MDBCol>
                    </MDBRow>
                    <hr/>
                    </>
                )
            else
                tmp.push(
                    <>
                    <MDBRow>
                    <MDBCol><strong>{key}</strong></MDBCol>
                    <MDBCol>{this.state.offer[key]}</MDBCol>
                    </MDBRow>
                    <hr/>
                    </>
                )
        }
        return tmp;
    }
   
  render() {
    if(!this.state.redirectToLogin && this.state.readyToRender)
      return (
        <div className="pt-5" style={{"minHeight": "100%"}}>
        <MDBRow className="pt-5 w-100 mx-0">
          <MDBCol lg="8" md="10" sm="12" className="mx-auto p-5 z-depth-1">
            <p style={{"fontSize":"200%"}}>Gitara: <strong>{this.state.offer.model}</strong> [id:{this.state.offer.id}]</p>
                <hr className="hr-dark"/>
                {this.renderOffer()}
               <hr className="hr-dark"/>
               <MDBRow className="w-100 mx-0">
                   <MDBCol className="text-center">
                       <MDBBtn color="light" href="/profile/offers"><MDBIcon icon="chevron-left" className="mr-1"/>cofnij</MDBBtn>
                   </MDBCol>
                   <MDBCol className="text-center">
                       <MDBBtn color="grey" href={"/profile/offers/edit/"+this.state.offer.id}><MDBIcon icon="cog" className="mr-1"/>edytuj</MDBBtn>
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
export default UserDetailsOffer;
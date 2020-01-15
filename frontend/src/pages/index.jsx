import React, { Component } from "react";
import { 
  MDBCol,
  MDBRow 
} from "mdbreact";
import CarouselPage from '../components/Carousel';
import AddCar from "../components/CarouselAdd";


class WelcomePage extends Component{
  render(){
    return(
      <React.Fragment>
        <MDBRow>
        <CarouselPage/>
       </MDBRow>
       <MDBRow>
      <MDBCol md-3></MDBCol>
    <MDBCol className="text-center">
      <div>
        <h2>
           Witam na stronie Gitary z drugiej ręki!
        </h2>
        <p>Tutaj znajdziesz oferty sprzedaży gitar elektrycznych oraz sam je wystawiać</p>
        <p>
          Poniżej kilka przykładowych ofert:
         
        </p>
      <AddCar/>
      </div>
    </MDBCol>
    <MDBCol md-3></MDBCol>
    </MDBRow>
    <MDBRow>
    <MDBCol md-3></MDBCol>
    <MDBCol className="text-center">
      <div>
       
      </div>
    </MDBCol>
    <MDBCol md-3></MDBCol>
    </MDBRow>
    </React.Fragment>
    );
  }
    
    
};
  
  export default WelcomePage;


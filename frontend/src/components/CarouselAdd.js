import React from "react";
import { 
  MDBCarousel,
  MDBCarouselInner, 
  MDBCarouselItem, 
  MDBView, 
  MDBContainer, 
  MDBRow
} from "mdbreact";
// import "../css/carousel.css"
import Axios from "axios";
// import offers from "..//pages/offers";

class AddCar extends React.Component{
constructor(props){
  super(props);
  this.state={
    add:[]

  };
}

componentDidMount(){
  Axios.get('http://localhost:4000/Add')
  .then(response=>{
      this.setState({add:response.data});
      console.log(this.add.length)
  })
  .catch(function(error){
    console.log(error);
  })
}



CreateCarousel(){
  return(
  <MDBRow>  
  <MDBContainer className="container">
    <MDBCarousel 
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
        {this.CreateInner()}
        </MDBCarouselInner>
    </MDBCarousel>
  </MDBContainer>
  </MDBRow>
  )
}

CreateInner(){
  let item=[];
  while(this.state.add.length>0){
    item.push(this.CreteItem(this.state.add.pop(),this.state.add.length));
   
  }
  console.log(item.length);
  return item;
}

CreteItem(item,lengths){
  return(
  <MDBCarouselItem itemId={lengths}>
  <MDBView>
    <img
      className="d-block w-100"
      src="https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg"
      alt={item.model}
    />
  </MDBView>
  </MDBCarouselItem>
  );
}

render(){
  return (
      <div>
        {this.CreateCarousel()}
        </div>
          
      
    );
  }
}
export default AddCar;
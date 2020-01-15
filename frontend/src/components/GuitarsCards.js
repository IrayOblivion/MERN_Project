import React,{Component} from "react"
import axios from "axios"
import {MDBCard,MDBCol,MDBRow,MDBAnimation,MDBContainer,MDBCardImage,MDBCardBody,MDBNavLink} from "mdbreact"



class GuitarPage extends Component {
    constructor(props) {
      super(props);
      this.state = {guitars_arr: []};
    }
  
    componentDidMount() {
      axios.get('http://localhost:4000/offers')
          .then(response => {
              this.setState({ guitars_arr: response.data });
              console.log(this.state.guitars_arr);
          })
          .catch(function (error){
              console.log(error);
          })
    }
  
    makeGuitarsRow() {
      return <MDBRow className="w-100 mx-auto" id="guitars">
          {this.gatherAllGuitarsCols()}
          </MDBRow>;
    }
  
    gatherAllGuitarsCols() {
      let tmp = [];
      while (this.state.guitars_arr.length>0)
        tmp.push(this.makeAnimatedGuitarCard(this.state.guitars_arr.pop()));
      return tmp;
    }
    
    makeAnimatedGuitarCard(guitar) {
      return (       
      <MDBCol sm="6" md="4" lg="3">
        <MDBCard cascade className="my-3 mx-0 px-0 grey lighten-4">
          <MDBContainer cascade className="p-3">
          <MDBCardImage
            cascade
            className="img-fluid"
            src="../assests/example.png"
            style={{height: "50%", margin: "auto"}}
            alt={guitar.model}
          />
          </MDBContainer>
          <MDBCardBody cascade className="text-center">
            {guitar.model}
            <MDBNavLink 
                tag="button"
                to={"/offers/"+ guitar.id}//trzeba zrobić route
                className="btn btn-outline-mdb-color btn-sm btn-rounded"
              >
                Obejrz
            </MDBNavLink>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
      );
    }
  
    scrollToTop = () => window.scrollTo(0, 0);
  
    render() {
      return (
        <>
        
          <div className="mt-3 mb-5">    
              <MDBRow className="w-100 m-0">
                <MDBCol md="0" lg="1" className="p-0" style={{"max-width": "90%"}}/>
                <MDBCol className="mt-4" md="12" lg="10">
                  {this.makeGuitarsRow()}
                </MDBCol>
                <MDBCol md="0" lg="1" className="p-0" style={{"max-width": "90%"}}/>
              </MDBRow>
          </div>
        </>
      );
    }
  }

  export default GuitarPage;
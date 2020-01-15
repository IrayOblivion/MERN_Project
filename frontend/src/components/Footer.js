import React, { Component } from "react";
import { 
  MDBCol, 
  MDBContainer, 
  MDBRow, 
  MDBFooter
} from "mdbreact";

class Footer extends Component {
  render() {
    return (
      <MDBFooter color="grey"  className="font-small pt-4 mt-4  myfooter">
        
        <MDBContainer fluid className="text-center text-md-left">
          <MDBRow>
            <MDBCol md="6">
              <h5 className="title">Footer Content</h5>
              <p>
                Gitary z drugiej ręki najlepsza strona z ogłoszeniami.
              </p>
            </MDBCol>
            <MDBCol md="6">
              <h5 className="title">Links</h5>
              <ul>
                <li className="list-unstyled">
                  {/* <Link href="#!">
                  <a >Link 1</a>
                  </Link> */}
                </li>
                <li className="list-unstyled">
                {/* <Link href="#!">
                  <a >Link 2</a>
                  </Link> */}
                </li>
              </ul>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBFooter>
    );
  }
}

export default Footer;
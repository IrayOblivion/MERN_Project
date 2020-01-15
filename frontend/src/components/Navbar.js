import React, { Component } from "react";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBIcon,
  MDBNavLink
} from "mdbreact";
import axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      menu: this.loginRegisterOptions()
    };
  }

  toggleCollapse = collapseId => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  loginRegisterOptions() {
    return(
      <MDBDropdownMenu className="dropdown-default">
        <MDBDropdownItem href="/login">
          Logowanie
        </MDBDropdownItem>
        <MDBDropdownItem href="/register">
          Rejestracja
        </MDBDropdownItem>
      </MDBDropdownMenu>
    );
  }

  profileLogoutOptions() {
    return (
      <MDBDropdownMenu className="dropdown-default">
        <MDBDropdownItem href="/profile">
          Profil
        </MDBDropdownItem>
        <MDBDropdownItem href="/login" onClick={this.handleLogout}>
          Wyloguj
        </MDBDropdownItem>
      </MDBDropdownMenu>
    );
  }

  componentDidMount() {
    axios.post("http://localhost:4000/profile", null ,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" }).then(response => {
      if(response.data.valid === false)
        this.setState({redirectToLogin: true});
      else {
        this.setState({menu: this.profileLogoutOptions()})
      }
      });
  }

  handleLogout(event) {
    event.preventDefault();
    document.cookie = 'ul_tkn=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.location.reload();
  }

  render() {
    return (
        <MDBNavbar color="grey" dark expand="md" fixed='top' scrolling >
            <MDBNavbarBrand href='/' className='py-0 font-weight-bold'>
                <img src={require("../assets/logo.png")} style={{ height: '2.5rem', width: '2.5rem' }} alt=""/>
                <strong className='align-middle'>Gz2Ręki</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.toggleCollapse} />            
            <MDBCollapse isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>

              <MDBNavItem>
                <MDBNavLink to="/guitars">Gitary</MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>

            <MDBNavbarNav right>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" />
                </MDBDropdownToggle>
                {this.state.menu}
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
    );
  }
}

export default Navbar;

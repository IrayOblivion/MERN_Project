import React, { Component } from "react";
import { 
  MDBRow, 
  MDBCol, 
  MDBInput,
  MDBBtn,
  MDBIcon
} from "mdbreact";
import ValidationErrorMessage from "../components/validationErrorMessage";
import axios from "axios"
import { Redirect } from "react-router-dom";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {         
      successfulRegistration: false,
      redirectToProfile: false,
      readyToRender: false,
      user: {
        username: null,
        firstName: null,
        lastName: null,
        email: null,
        tel: null,
        address: null,
        place: null,
        postCode: null,
        password: null
      },
      errors: {
        username: false,
        firstName: false,
        lastName: false,
        email: false,
        tel: false,
        address: false,
        place: false,
        postCode: false,
        password: false
      }
    };
    this.onChange = this.changeHandler.bind(this);
    this.onSubmit = this.submitHandler.bind(this);    
    this.onReset = this.handleReset.bind(this); 
  }

  componentDidMount() {
    axios.post("http://localhost:4000/profile", null ,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" }).then(response => {
      if(response.data.valid === true)
        this.setState({redirectToProfile: true});
      else
        this.setState({readyToRender: true});
    });
  }

  handleReset = (event) => {
    event.preventDefault()
    event.target.reset();
    this.setState({user: {}});
  }
  
  submitHandler = event => {
    event.preventDefault();
    event.persist();
    const newUser = {
        firstName: this.state.user.firstName,
        lastName: this.state.user.lastName,
        email: this.state.user.email,
        tel: this.state.user.tel,
        address: this.state.user.address,
        place: this.state.user.place,
        postCode: this.state.user.postCode,
        username: this.state.user.username,
        password: this.state.user.password,
        passwordRepeat: this.state.user.passwordRepeat,
    };

    console.log(newUser)
    axios.post("http://localhost:4000/register", newUser)
    .then(response => {
        if(response.data.valid === true)
          this.setState({successfulRegistration: true})
        else{
          this.setState({errors: response.data.errors})
          if(response.data.mail_val===false){
            this.setState({email: true})
            console.log("jeszcze raz",this.state.errors)
          }
        }
        console.log(response.data.mail_val)
        console.log("wypisz to",this.state.errors)  
    });
  };

  changeHandler = event => {
    let tmp = this.state.user;
    tmp[event.target.name]=event.target.value;
    this.setState({user: tmp});
  };

  render() {
    if(this.state.successfulRegistration)
      return <Redirect to="/login"/>;
    if(this.state.redirectToProfile || this.state.successfulLogin==true)
      return <Redirect to="/profile"/>;
    if(this.state.readyToRender==true)
      return (
        <div className="pt-5">
        <MDBRow className="pt-5 w-100 mx-0">
          <MDBCol lg="6" md="8" sm="10" className="mx-auto p-5 z-depth-1">
          <form onReset={this.handleReset} onSubmit={this.submitHandler}>
          <p className="h4 text-center mb-6">Rejestracja</p>
          <p className="m-0">Dane osobowe</p>
          <MDBRow className="mx-auto" style={{"maxWidth": "90%"}}>
            <MDBCol xs="12" sm="6">
              <MDBInput
                onChange={this.changeHandler} 
                label="Imię"
                icon="signature"
                type="text"
                name="firstName"
                
              />
              <ValidationErrorMessage hidden={!this.state.errors.firstName} message="Należy podać imię!"/>
            </MDBCol>
            <MDBCol xs="12" sm="6">
              <MDBInput
                onChange={this.changeHandler} 
                label="Nazwisko"
                type="text"
                name="lastName"
                required
                />
                <ValidationErrorMessage hidden={!this.state.errors.lastName} message="Należy podać nazwisko!"/>
            </MDBCol>
          </MDBRow>
          <hr className="hr-dark"/>
          <p className="m-0">Dane zamieszkania</p>
          <MDBRow className="mx-auto" style={{"maxWidth": "90%"}}>
            <MDBCol xs="12" sm="6">
              <MDBInput
                onChange={this.changeHandler} 
                label="Adres zam."
                icon="city"
                type="text"
                name="address"
                required
              />
              <ValidationErrorMessage hidden={!this.state.errors.address} message="Należy podać adres zamieszkania"/>
            </MDBCol>
            <MDBCol xs="0" sm="6"/>
          </MDBRow>
          <MDBRow className="mx-auto" style={{"maxWidth": "90%"}}>
            <MDBCol xs="12" sm="6">
              <MDBInput
                onChange={this.changeHandler} 
                label="Miejscowość"
                icon="home"
                name="place"
                required
              />
              <ValidationErrorMessage hidden={!this.state.errors.place} message="Należy podać miejscowość!"/>
            </MDBCol>
            <MDBCol xs="12" sm="6">
              <MDBInput
                onChange={this.changeHandler} 
                label="Kod pocztowy"
                icon="envelope"
                type="text"
                name="postCode"
                required
              />
              <ValidationErrorMessage hidden={!this.state.errors.postCode} message="Należy podać poprawny kod pocztowy!"/>
            </MDBCol>
          </MDBRow>
          <hr className="hr-dark"/>
          <p className="m-0">Dane kontaktowe</p>
          <MDBRow className="mx-auto" style={{"maxWidth": "90%"}}>
            <MDBCol xs="12" sm="6">
              <MDBInput
                onChange={this.changeHandler} 
                label="Email"
                icon="at"
                type="email"
                name="email"
                required
              />
              <ValidationErrorMessage hidden={!this.state.errors.email} message="Podany email jest nieprawidłowy, bądź zajęty!"/>
            </MDBCol>
            <MDBCol xs="12" sm="6">
              <MDBInput
                onChange={this.changeHandler} 
                label="Numer tel."
                icon="phone"
                name="tel"
                required
              />
                <ValidationErrorMessage hidden={!this.state.errors.tel} message="Podany numer jest nieprawidłowy, bądź zajęty!"/>
            </MDBCol>
          </MDBRow>
          <hr className="hr-dark"/>
          <p className="m-0">Dane konta</p>
          <MDBRow className="mx-auto" style={{"maxWidth": "90%"}}>
            <MDBCol xs="12" sm="6">
              <MDBInput
                onChange={this.changeHandler} 
                label="Użytkownik"
                icon="user"
                name="username"
                required
              />
              <ValidationErrorMessage hidden={!this.state.errors.username} message="Należy podać nazwę użytkownika!"/>
            </MDBCol>
            <MDBCol xs="0" sm="6"/>
          </MDBRow>
          <MDBRow className="mx-auto" style={{"maxWidth": "90%"}}>
            <MDBCol xs="12" sm="6">
              <MDBInput
                onChange={this.changeHandler} 
                label="Hasło"
                icon="lock"
                type="password"
                name="password"
                required
              />
              <ValidationErrorMessage hidden={!this.state.errors.password} message="Należy podać hasło!"/>
            </MDBCol>
            <MDBCol xs="12" sm="6">
              <MDBInput
                onChange={this.changeHandler} 
                label="Powtórz hasło"
                type="password"
                name="passwordRepeat"
                required
              />
              <ValidationErrorMessage hidden={!this.state.errors.passwordRepeat} message="Podane hasła nie pokrywają się!"/>
            </MDBCol>
          </MDBRow>  
          {this.state.validationErrorMessage}
          <MDBRow className="text-center">
            <MDBCol>
              <MDBBtn color="mdb-color" type="reset">
                <MDBIcon className="mr-1" icon="undo"/>
                wyczyść
              </MDBBtn>
            </MDBCol>
            <MDBCol>
              <MDBBtn color="grey" type="submit">
              <MDBIcon className="mr-1" icon="plus-circle"/>
                załóż konto
              </MDBBtn>
            </MDBCol>
          </MDBRow>
          <MDBRow className="text-center">
            <MDBCol>
              <MDBBtn color="blue-grey" href="/login">
              <MDBIcon className="mr-1" icon="user"/>
                mam już konto
              </MDBBtn>
            </MDBCol>
            </MDBRow>
            <MDBCol>
              <MDBRow>
                <span>* brak przeniesienia na stronę z logowaniem świadczy o braku unikalności email</span>
              </MDBRow>
            </MDBCol>
        </form>
        <div className="text-center pt-3">
          <p>Rozmyśliłem się, zabierz mnie stąd...</p>
          <a href="/register">Powrót na stronę główną</a>
        </div>
        </MDBCol>
      </MDBRow>
      </div>
      );
    else
      return('"');
  }
}

export default Register;
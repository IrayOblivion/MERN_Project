import React, { Component } from "react";
import { 
  MDBRow,
  MDBCol, 
  MDBInput, 
  MDBBtn,
  MDBContainer
} from "mdbreact";
import ValidationErrorMessage from "../components/validationErrorMessage";
import axios from 'axios';
import { Redirect } from "react-router-dom";

class Login extends Component {
  state = {
    email:"",
    password:"",
    successfulLogin: false,
    validationErrorMessage: null,
    redirectToProfile: false,
    readyToRender: false
    };

  componentDidMount() {
    axios.post("http://localhost:4000/profile", null ,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" }).then(response => {
      if(response.data.valid === true)
        this.setState({redirectToProfile: true});
      else
        this.setState({readyToRender: true});
    });
  }

  submitHandler = event => {
    event.preventDefault();
    event.persist();
    const loginSession = {
        email: this.state.email,
        password: this.state.password,
    };
    axios.post("http://localhost:4000/login", loginSession, {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
    .then(response => {
        if(response.data.valid === true)
            this.setState({validationErrorMessage: null, successfulLogin: true});
        else
            this.setState({validationErrorMessage: <ValidationErrorMessage message="Podany email, bądź hasło są nieprawidłowe!"/>});
    });
  };

  changeHandler = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    if(this.state.redirectToProfile || this.state.successfulLogin==true)
      return <Redirect to="/profile"/>;
    if(this.state.successfulLogin==false && this.state.readyToRender==true)
      return (
        <div className="pt-5" style={{"minHeight": "100%"}}>
          <MDBRow className="pt-5 w-100 mx-0">
            <MDBCol lg="6" md="8" sm="10" className="mx-auto p-5 z-depth-1">
            <form onSubmit={this.submitHandler}>
            <p className="h4 text-center mb-6">Logowanie</p>
              <MDBInput 
                onChange={this.changeHandler}
                label="Podaj email"
                icon="user"
                type="email"
                name="email"
                required
              />
              <MDBInput 
                onChange={this.changeHandler}
                label="Podaj hasło"
                icon="lock"
                type="password"
                name="password"
                required
              />
              {this.state.validationErrorMessage}
              <MDBBtn className="btn btn-info btn-block my-6" color='mdb-color' type='submit'>
                Zaloguj
              </MDBBtn>
              </form>
            <div className="text-center pt-3">
             <p>Nie masz konta? 
               <a href="/register"> Załóż konto!</a>
              </p>
            </div>
             </MDBCol>
          </MDBRow>
       </div>
      );
    else
      return('"');
  }
}

export default Login;
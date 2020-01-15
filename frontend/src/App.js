import React, { Component } from 'react';
import './App.css';
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

class App extends Component {
  render() {
    return (
      <div style={{"minHeight": "100vh"}}>
        <Router>
          <NavBar/>
          <Routes />
          <Footer/>
        </Router>
      </div>
    );
  }
}

export default App;

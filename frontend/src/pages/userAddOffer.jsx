import React, { Component } from "react";
import axios from "axios";
import { 
    MDBRow,
    MDBCol,
    MDBBtn,
    MDBBtnGroup,
    MDBIcon} from "mdbreact";
import {Redirect} from "react-router-dom";
import ValidationErrorMessage from "../components/validationErrorMessage";
import guitarParametersRequirements from "../translation/guitarParametersRequirements";
import guitarParametersErrorMessage from "../translation/guitarParametersErrorMessage";

class UserAddOffer extends Component {
  constructor(props) {
      super(props);
      this.state = {
          redirectToLogin: false,
          readyToRender: false,
          params: {},
          template: {},
          offer: {},
          errors: {
            id:false,
            body:false,
            model:false,
            neck:false,
            fingerboard: false,
            scale:false,
            fres:false,
            strings:false,
            hand:false,
            brand:false,
            pickup:false,
            controls:false,
            price:false,
            description: false,
            weight:false,
            color:false,
            switch:false
          },
          success: false
      };
      this.renderInput = this.renderInput.bind(this);
      this.renderSelect = this.renderSelect.bind(this);
      this.handleReset =this.handleReset.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    axios.post("http://localhost:4000/profile/offer/template", null ,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" }).then(response => {
      if(response.data.valid === false)
        this.setState({redirectToLogin: true});
      else
        this.setState({params: response.data.params, template: response.data.template, readyToRender: true});
    });
  }

  handleChange = (event) => {
    let tmp = this.state.offer;
    tmp[event.target.name]=event.target.value;
    this.setState({offer: tmp});
  }

  handleReset = () => {
    this.setState({offer: this.state.template});
  }
  
  handleSubmit = (event) => {
    event.preventDefault();

    const newOffer = {
        id: this.state.offer.id,
        body: this.state.offer.body,
        model: this.state.offer.model,
        neck: this.state.offer.neck,
        fingerboard: this.state.offer.fingerboard,
        scale: this.state.offer.scale,
        frets: this.state.offer.frets,
        strings: this.state.offer.strings,
        hand: this.state.offer.hand,
        brand: this.state.offer.brand,
        pickup: this.state.offer.pickup,
        controls: this.state.offer.controls,
        price: this.state.offer.price,
        description: this.state.offer.description,
        weight: this.state.offer.weight,
        color: this.state.offer.color,
        switch: this.state.offer.switch
      };

    axios.post("http://localhost:4000/profile/offer/add", newOffer,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
    .then(response => {
        if(response.data.valid_e=== true &&response.data.valid===true )
          this.setState({success: true})
        else
          this.setState({errors: response.data.errors})
    });
  }

  renderInput(name) {
    var tmp = null;
    if(name=="description")
        tmp = <textarea onChange={this.handleChange} name={name}/>;
    else
        tmp = <input onChange={this.handleChange} name={name}/>;
    return (
        <div  className="p-2 m-3 z-depth-1">        
        <div>
            <p><strong>{name}</strong></p>
            <p>{guitarParametersRequirements[name]}</p>
        </div>
        <div>
        </div>
        <div>
            {tmp}
        </div>
        <div>
            <ValidationErrorMessage hidden={!this.state.errors[name]} message={guitarParametersErrorMessage[name]}/>
        </div>
        </div>
    );
  }  
  
  renderSelect(name, options) {  
    let tmp = [];
    tmp.push(<option selected value="">--</option>)
    for(var j =0; j< options.length; j++)
        tmp.push(<option value={options[j]}>{options[j]}</option>);
    return (
        <div  className="p-2 m-3 z-depth-1">        
        <div>
            <p><strong>{name}</strong></p>
            <p>{guitarParametersRequirements[name]}</p>
        </div>
        <div>
            <select onChange={this.handleChange}  name={name}>
                {tmp}
            </select>
        </div>
        <div>
            <ValidationErrorMessage hidden={!this.state.errors[name]} message={guitarParametersErrorMessage[name]}/>
        </div>
        </div>
    );
  }


  renderForm() {
    let tmp = [];
    for(var parameter in this.state.template) {
        if(this.state.params[parameter]!==undefined)
            tmp.push(this.renderSelect(parameter, this.state.params[parameter]));
        else
            tmp.push(this.renderInput(parameter));
    }
    return tmp;
  }
  

  render() {
    if(this.state.success)
        return <Redirect to="/profile/offers"/>;
    if(!this.state.redirectToLogin && this.state.readyToRender == true )
      return (
        <div className="pt-5" style={{"minHeight": "100%"}}>
        <MDBRow className="pt-5 w-100 mx-0">
          <MDBCol lg="8" md="10" sm="12" className="mx-auto p-5 z-depth-1">
            <p style={{"fontSize":"200%"}}>Nowa oferta</p>
            <form onReset={this.handleReset} onSubmit={this.handleSubmit}>
                <hr className="hr-dark"/>
               {this.renderForm()}
               <hr className="hr-dark"/>
               <MDBRow>
                   <MDBCol className="text-center">
                       <MDBBtn color="light" href="/profile/offers"><MDBIcon icon="chevron-left" className="mr-1"/>anuluj</MDBBtn>
                   </MDBCol>
                   <MDBCol className="text-center">
                       <MDBBtn color="mdb-color" type="reset"><MDBIcon icon="undo" className="mr-1"/>wyczyść</MDBBtn>
                   </MDBCol>
                   <MDBCol className="text-center">
                       <MDBBtn color="grey" type="submit"><MDBIcon icon="check" className="mr-1"/>dodaj</MDBBtn>
                   </MDBCol>
               </MDBRow>
            </form>
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
export default UserAddOffer;
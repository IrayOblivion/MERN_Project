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

class UserEditOffer extends Component {
  constructor(props) {
      super(props);
      this.state = {
          redirectToLogin: false,
          redirectToOfferList: false,
          params: {},
          template: {},
          offer: {},
          offerEdited: {},
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
          templateFetched: false,
          offerFetched: false,
          success: false
      };
      this.renderInput = this.renderInput.bind(this);
      this.renderSelect = this.renderSelect.bind(this);
      this.handleReset =this.handleReset.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.post("http://localhost:4000/profile/offer/"+this.props.match.params.id, null ,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" }).then(response => {
        if(response.data.valid === false)
          this.setState({redirectToLogin: true});
        else {
            this.setState({offer: response.data.offer, offerEdited: Object.assign({}, response.data.offer)});
            this.setState({offerFetched: true});
        }
    });
    axios.post("http://localhost:4000/profile/offer/template", null ,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" }).then(response => {
      if(response.data.valid === false)
        this.setState({redirectToLogin: true});
      else {
        this.setState({params: response.data.params});
        this.setState({paramsFetched: true});
      }
    });
  }

  handleChange = (event) => {
    let tmp = this.state.offerEdited;
    tmp[event.target.name]=event.target.value;
    this.setState({offerEdited: tmp});
  }

  handleReset = () => {
    this.setState({offerEdited: Object.assign({}, this.state.offer)});
  }
  
  handleSubmit = (event) => {
    event.preventDefault();

    const updatedOffer = {
        id: this.state.offerEdited.id,
        body: this.state.offerEdited.body,
        model: this.state.offerEdited.model,
        neck: this.state.offerEdited.neck,
        fingerboard: this.state.offerEdited.fingerboard,
        scale: this.state.offerEdited.scale,
        frets: this.state.offerEdited.frets,
        strings: this.state.offerEdited.strings,
        hand: this.state.offerEdited.hand,
        brand: this.state.offerEdited.brand,
        pickup: this.state.offerEdited.pickup,
        controls: this.state.offerEdited.controls,
        price: this.state.offerEdited.price,
        description: this.state.offerEdited.description,
        weight: this.state.offerEdited.weight,
        color: this.state.offerEdited.color,
        switch: this.state.offerEdited.switch
    };

    axios.post("http://localhost:4000/profile/offer/edit/"+this.props.match.params.id, updatedOffer,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
    .then(response => {

        if(response.data.valid === true && response.data.valid_e === true){
          this.setState({success: true})
          
        }
        else{
        
          this.setState({errors: response.data.errors})
        }
    });
  }

  handleDelete(event) {
    event.preventDefault();
    axios.post("http://localhost:4000/profile/offer/remove/"+this.props.match.params.id, null,  {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
    .then(response => {
        this.setState({redirectToOfferList: true})
    });
  }

  renderInput(name) {
    var tmp = null;
    if(name=="description")
        tmp = <textarea onChange={this.handleChange} name={name}/>;
    else
        tmp = <input onChange={this.handleChange} name={name} defaultValue={this.state.offer[name]}/>;
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
            <select onChange={this.handleChange}  name={name} defaultValue={this.state.offer[name]}> 
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
    console.log(this.state.offer)
    for(var parameter in this.state.offer) {
        if(parameter == "id")
            continue;
        if(this.state.params[parameter]!==undefined)
            tmp.push(this.renderSelect(parameter, this.state.params[parameter]));
        else
            tmp.push(this.renderInput(parameter));
    }
    return tmp;
  }
  

  render() {
    if(this.state.success || this.state.redirectToOfferList)
        return <Redirect to="/profile/offers"/>;
    if(!this.state.redirectToLogin && this.state.offerFetched == true && this.state.paramsFetched)
      return (
        <div className="pt-5" style={{"minHeight": "100%"}}>
        <MDBRow className="pt-5 w-100 mx-0">
          <MDBCol lg="8" md="10" sm="12" className="mx-auto p-5 z-depth-1">
            <p style={{"fontSize":"200%"}}>Edycja: <strong>{this.state.offer.model}</strong> [id:{this.state.offer.id}]</p>
            <form onReset={this.handleReset} onSubmit={this.handleSubmit}>
                <hr className="hr-dark"/>
               {this.renderForm()}
               <hr className="hr-dark"/>
               <MDBRow className="w-100 mx-0">
                   <MDBCol className="text-center">
                       <MDBBtn color="light" href="/profile/offers"><MDBIcon icon="chevron-left" className="mr-1"/>anuluj</MDBBtn>
                   </MDBCol>
                   <MDBCol className="text-center">
                       <MDBBtn color="mdb-color" type="reset"><MDBIcon icon="undo" className="mr-1"/>cofnij zmiany</MDBBtn>
                   </MDBCol>
                   <MDBCol className="text-center">
                       <MDBBtn color="grey" type="submit"><MDBIcon icon="check" className="mr-1"/>aktualizuj</MDBBtn>
                   </MDBCol>
                   <MDBCol className="text-center">
                       <MDBBtn color="black" onClick={this.handleDelete}><MDBIcon icon="times" className="mr-1"/>usuń</MDBBtn>
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
export default UserEditOffer;
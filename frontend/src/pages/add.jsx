import React, { Component } from "react";
import axios from "axios";
import {
    MDBCol,
    MDBRow,
    MDBCard,
    MDBBtn, 
    MDBCardBody,
    MDBInput,
} from "mdbreact";
// import "../css/card.css"
//Czcionka do zmiany
class Add extends Component{
    constructor(props){
        super(props);
        this.state={
            producer:"",
            model:"",
            body:"",
            neck:"",
            fingerboard:"",
            colour:"",
            weight:"",
            wunit:"",
            frets:"",
            scale_length:0,
            strings:0,
            hand: "",
            pickup:"",
            switch:Boolean,
            controls:0,
            timePublished_on:"",
            timePublished_off:"",
            photo:"",//do poprawienia
            price:1,
            currency:"",
            description:"",
            pay_methods:"",
            //owner:-1 do zrobienia z cookie bez tego mogiła
        };
        this.onChangePort = this.changeHandler.bind(this);
        this.onSubmit = this.submitHandler.bind(this);
    }
    
     submitHandler = event => {
        event.preventDefault();
        event.target.className += " was-validated";
 
       axios.post('http://localhost:4000/register')
        .then(res => console.log(res.data));
      };
    
      changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
      };
      CreateCard(){
          return(
        
        <MDBCard className="mycard">
            <MDBCardBody>
                <h3>
                Body description
                </h3>
                {this.CreateBody()}
                <hr/>
                <h3>
                Fingerboard description
                </h3>
                {this.CreateFingerBoard()}
                <hr/>
                <h3>
                    Electronic parts description
                </h3>       
                 {this.CreateElectro()}
                 <hr/>
                 <h3>
                    Info description
                </h3>       
             
                {this.CreateInfo()}
                <hr/>
                <MDBBtn color='primary' type='submit'>
                        Submit Form
                    </MDBBtn>
            </MDBCardBody>
        </MDBCard>
       /*   <MDBCard>
         
        <MDBCard>
            <MDBCardBody>
            </MDBCardBody>
        </MDBCard>
        <h3>
            Price, pay method, photo description
        </h3>
    */
          );
      }
      CreateBody(){
            return(
               <div> 
       
                <MDBRow> 
                    <MDBCol>
                    <MDBInput
                        icon='user'
                        value={this.state.producer}
                        name='producer'
                        onChange={this.changeHandler}
                        type='text'
                        id='producer'
                        name="producer"
                        label='Producer'
                        required
                        pattern="^[A-Z]{1}[a-z]{2,15}"
                          >
                        <div className='invalid-feedback ml-4 pl-3'>incorrect producer</div>
                        <div className='valid-feedback ml-4 pl-3'>correct</div>
                   </MDBInput>
                   </MDBCol>
                   <MDBCol>
                    <MDBInput
                        icon='user'
                        value={this.state.model}
                        name='model'
                        onChange={this.changeHandler}
                        type='text'
                        id='model'
                        name="model"
                        label='model'
                        required
                        pattern="^[A-Z]{1}([a-z]|[0-9]){2,50}"
                          >
                        <div className='invalid-feedback ml-4 pl-3'>incorrect model</div>
                        <div className='valid-feedback ml-4 pl-3'>correct</div>
                    </MDBInput>
                    </MDBCol>
                    <MDBCol>
                    <MDBInput
                        icon='user'
                        value={this.state.body}
                        name='body'
                        onChange={this.changeHandler}
                        type='text'
                        id='body'
                        name="body"
                        label='body'
                        required
                        pattern="^[A-Z]{1}[a-z]{2,15}"
                          >
                        <div className='invalid-feedback ml-4 pl-3'>incorrect body</div>
                        <div className='valid-feedback ml-4 pl-3'>correct</div>
                   </MDBInput>
                   </MDBCol>
                   </MDBRow>
                   <MDBRow>
                   <MDBCol>
                    <MDBInput
                        icon='user'
                        value={this.state.neck}
                        name='neck'
                        onChange={this.changeHandler}
                        type='text'
                        id='neck'
                        name="neck"
                        label='neck'
                        required
                        pattern="^[A-Z]{1}[a-z]{2,15}"
                          >
                        <div className='invalid-feedback ml-4 pl-3'>incorrect neck</div>
                        <div className='valid-feedback ml-4 pl-3'>correct</div>
                   </MDBInput>
                   </MDBCol>
                   <MDBCol>
                    <MDBInput
                        icon='user'
                        value={this.state.fingerboard}
                        name='fingerboard'
                        onChange={this.changeHandler}
                        type='text'
                        id='fingerboard'
                        name="fingerboard"
                        label='fingerboard'
                        required
                        pattern="^[A-Z]{1}[a-z]{2,15}"
                          >
                        <div className='invalid-feedback ml-4 pl-3'>incorrect fingerboard</div>
                        <div className='valid-feedback ml-4 pl-3'>correct</div>
                   </MDBInput>
                   </MDBCol>
                   <MDBCol>
                    <MDBInput
                        icon='user'
                        value={this.state.colour}
                        name='colourcolour'
                        onChange={this.changeHandler}
                        type='text'
                        id='colour'
                        name="colour"
                        label='colour'
                        required
                        pattern="^[A-Z]{1}[a-z]{2,15}"
                          >
                        <div className='invalid-feedback ml-4 pl-3'>incorrect colour</div>
                        <div className='valid-feedback ml-4 pl-3'>correct</div>
                   </MDBInput>
                   </MDBCol>

                    </MDBRow>
                    <MDBRow>
                    <MDBCol>
                    <MDBInput
                        icon='user'
                        value={this.state.weight}
                        name='weight'
                        onChange={this.changeHandler}
                        type='text'
                        id='weight'
                        name="weight"
                        label='weight'
                        required
                        pattern="^[1-9]{1,2}"
                          >
                        <div className='invalid-feedback ml-4 pl-3'>incorrect weight</div>
                        <div className='valid-feedback ml-4 pl-3'>correct</div>
                   </MDBInput>
                   </MDBCol>
                   <MDBCol>
                   <select className="browser-default custom-select" style={{"margin-top":"3ex"}}>  
                        <option value="kg" onChange={this.changeHandler} selected>Kg</option>
                        <option value="p" onChange={this.changeHandler}>P</option>
                    </select>
                   </MDBCol>

                    </MDBRow>
      
        </div> 
        );

      }

      CreateFingerBoard(){
        return(
           <div>
                <MDBRow> 
                    <MDBCol>    
                        
                        <h5>Number of frets</h5>
                        <select className="browser-default custom-select">
                            <option>21</option>
                            <option selected>22</option>
                            <option>23</option>
                            <option>24</option>
                        </select>
                    </MDBCol>
                    <MDBCol >  
                    <MDBInput
                        icon='user'
                        value={this.state.scale_length}
                        name='scale_length'
                        onChange={this.changeHandler}
                        type='number'
                        id='scale_length'
                        name="scale_length"
                        label='scale_length'
                        required
                        pattern="^[1-9]{2}"
                          >
                        <div className='invalid-feedback ml-4 pl-3'>incorrect scale_length</div>
                        <div className='valid-feedback ml-4 pl-3'>correct</div>
                   </MDBInput>
                   </MDBCol>
                </MDBRow>
                <MDBRow>
                <MDBCol>    
                        
                        <h5>Number of strings</h5>
                        <select className="browser-default custom-select" >
                       
                            <option value='6' onChange={this.changeHandler} selected>6</option>
                            <option value='7' onChange={this.changeHandler}>7</option>
                            
                        </select>
                    </MDBCol>
                    <MDBCol>    
                        
                        <h5>Handness</h5>
                        <select className="browser-default custom-select" >
                       
                            <option value="right" onChange={this.changeHandler} selected>right</option>
                            <option value="left" onChange={this.changeHandler}>left</option>
                            
                        </select>
                    </MDBCol>
                </MDBRow>
            </div>
        );
    }

    CreateElectro(){
        return(
            <div>
                <MDBRow>
                    <MDBCol>
                    <MDBInput
                    style={{"height":"4.5ex"}}
                        icon='user'
                        value={this.state.pickup}
                        name='pickup'
                        onChange={this.changeHandler}
                        type='text'
                        id='pickup'
                        name="pickup"
                        label='pickup'
                        required
                        pattern="^[A-Z]{2,3}"
                          >
                        <div className='invalid-feedback ml-4 pl-3'>incorrect pickup</div>
                        <div className='valid-feedback ml-4 pl-3'>correct</div>
                   </MDBInput>
                   </MDBCol>
                   <MDBCol>
                   Is switch?
                   <select className="browser-default custom-select" style={{"margin-top":"2ex"}}>
                        
                        <option value='true' onChange={this.changeHandler} selected>true</option>
                        <option value='false' onChange={this.changeHandler}>false</option>
                       
                    </select>
                   </MDBCol>
                   <MDBCol>
                   Number of controls?
                   <select className="browser-default custom-select" style={{"margin-top":"2ex"}}>
                        <option value='2' onChange={this.changeHandler} selected>2</option>
                        <option value='3'onChange={this.changeHandler}>3</option>
                        <option value='4'onChange={this.changeHandler}>4</option>
                    </select>
                   </MDBCol>
                </MDBRow>
            </div>

        );
    }

    CreateInfo(){
        //nie wiem jak obejść warning setstate dla daty
        return(
            <div>
             <MDBRow>
               <div style={{"visibility": "hidden"}}>{this.state.timePublished_on=Date.now()}</div> 
                <div class="input-group">
                 <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">Upload</span>
                </div>
                </div>
                <div class="custom-file">
                <input
                onChange={this.changeHandler}
                type="file"
                class="custom-file-input"
                id="photo"
                accept="image/x-png,image/gif,image/jpeg"
                value={this.state.photo}
                name="photo"
                label='photo'
                aria-describedby="inputGroupFileAddon01"></input>
                  <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                </div>
            </MDBRow>  
            <MDBRow>
            <MDBCol>
                    <MDBInput
                    style={{"height":"4.5ex"}}
                        icon='user'
                        value={this.state.price}
                        name='price'
                        onChange={this.changeHandler}
                        type='number'
                        id='price'
                        name="price"
                        label='price'
                        required
                        pattern="^[1-9]{1}[0-9]{1,6}"
                          >
                        <div className='invalid-feedback ml-4 pl-3'>incorrect price</div>
                        <div className='valid-feedback ml-4 pl-3'>correct</div>
                   </MDBInput>
                   </MDBCol>
                   <MDBCol>
                       Currency
                   <select className="browser-default custom-select" style={{"margin-top":"2ex"}}>
                        <option value="pln" onChange={this.changeHandler} selected>pln</option>                   
                    </select>
                   </MDBCol>
                   <MDBCol>
                       Pay method
                   <select className="browser-default custom-select" style={{"margin-top":"2ex"}}>
                   
                        <option value="visa" onChange={this.changeHandler} selected>visa</option>
                        <option value="mastercard" onChange={this.changeHandler}>mastercard</option>
                        <option value="COD" onChange={this.changeHandler}>COD </option>
                        <option value="transfer" onChange={this.changeHandler}>transfer</option>
                       
                    </select>
                   </MDBCol>
            </MDBRow>
                <div style={{"visibility":"hidden"}}>
                   
                </div>
            </div>

            
        );
    }
    render(){
        return(
            <React.Fragment>
                <div>
                    <form
                         className='needs-validation'
                         onSubmit={this.submitHandler}
                         noValidate
                    >    
                    <MDBRow>
                    <MDBCol md='3'/>
                        <MDBCol md='6'>
                            <MDBCard>
                            <h2 className="text-center" style={{"fontFamily":"arial"}}>Adding offer</h2>
                            {this.CreateCard()}
                            
                            </MDBCard>
                            <br/>
                            <br/>
                            <br/>
                        </MDBCol>
                    <MDBCol md='3'/>
                        </MDBRow>        
                    </form>
                   
                </div>
      
         </React.Fragment>

        );

    };
}

export default Add;
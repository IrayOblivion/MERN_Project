import React, { Component } from "react";
import axios from "axios";
import {MDBRow, MDBCol, MDBCard, MDBCardBody} from "mdbreact"
// import axios from "axios";
// import "../css/card.css";
// import GUITAR_PL from "../translation/Guitars_PL"

 class SingleGuitarPage extends Component{
    constructor(props){
        super(props);
        this.state={
           guitar:undefined
        }
    } 

    createspan(specific_info, specific_name){

        return (
        <>
        <hr className='mb-2'/>
        <MDBRow>
        <MDBCol className="mx-auto"><strong>{specific_name[0].toUpperCase()+specific_name.slice(1)} </strong></MDBCol>
          <MDBCol>
            <span style={{'display': 'inline-block', 'maxWidth': '200px', 'whiteSpace': 'nowrap','overflow': 'hidden','textOverflow': 'ellipsis'}} >{specific_info}</span>{' '}
          </MDBCol>
        </MDBRow>
        </>

        )
    }

    listingmap(guitar){
        let tmp=[];
        for(let key in guitar){
            if(guitar[key]!==null){
                tmp.push(this.createspan(guitar[key],key))
            }

        }
        return tmp;
    }
 
    componentDidMount(){
         axios.get("http://localhost:4000/guitar/"+this.props.match.params.id)
             .then(Response => {
                 this.setState({
                    guitar: Response.data,
                    readyToRender: true 
                     
                 })
             }).catch(function(error){console.log(error);});
 
    }
    
    render(){
        return (
            <div className="pt-5">
              <div className="pt-4">
                <div className="clear-mask mx-1">
                  <MDBRow className="m-0 w-100">
                    <MDBCol md="0" lg="1" style={{"maxWidth": "90%"}}/>
                    <MDBCol className="mt-4" md="12" lg="10">
                        <MDBCard>
                            <MDBCardBody>
                                {this.listingmap(this.state.guitar)}
                            
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol md="0" lg="1" style={{"maxWidth": "90%"}}/>
                  </MDBRow>
                </div>
              </div>
            </div>
          );
         }
}


export default SingleGuitarPage;
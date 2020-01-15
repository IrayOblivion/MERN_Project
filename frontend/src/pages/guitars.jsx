import React, { Component } from "react";
import axios from "axios";
import {
    MDBCol,
    MDBRow,
} from "mdbreact";
import GuitarPicker from "../components/guitarPicker";
import GuitarFilter from "../components/quitarFilter";
import * as _ from "underscore"

class GuitarsPage extends Component{
    constructor(props) {
        super(props);
        this.state={
            guitars: [],
            filter: {},
            guitarPicker: null,
            quitarFilter: null
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
      let tmp = this.state.filter;
      console.log(event.target.name, event.target.value)
      if(tmp[event.target.name]===undefined)
          tmp[event.target.name] = [];
      if(event.target.checked)
          tmp[event.target.name].push(event.target.value)
      else
          tmp[event.target.name] = _.without(tmp[event.target.name], event.target.value);
      this.setState({filter: {}});
      this.setState({filter: tmp});
    }

    handleReset = () => {
      this.setState({filter: {}});
      axios.get('http://localhost:4000/guitars')
      .then(response=>{
              this.setState({ guitarPicker: ""});
              this.setState({ guitarPicker: <GuitarPicker guitars={response.data.offers}/>});
            }
      )
      .catch(function(error) {
              console.log(error);
          }
      )
    }

    handleSubmit = (event) => {
      event.preventDefault();
      var query_str = "?";
      for(var key in this.state.filter) {
        this.state.filter[key].forEach(element => {
          query_str += key+"="+element+"&";
        });
      }
      console.log(query_str.substring(0, query_str.length - 1));
      axios.get("http://localhost:4000/guitars"+query_str.substring(0, query_str.length - 1), {}, {withCredentials: true, crossDomain: true, "Content-Type": "application/json" })
      .then(response => {
          this.setState({ guitarPicker: ""});
          this.setState({ guitarPicker: <GuitarPicker guitars={response.data.offers}/>});
      }).catch(function(error) {
              console.log(error);
          }
      )
    }

    componentDidMount = () => {
        axios.get('http://localhost:4000/guitars')
        .then(response=>{
                this.setState(
                  { 
                    guitarPicker: <GuitarPicker 
                    guitars={response.data.offers}/>,
                    quitarFilter: <GuitarFilter 
                    filterParams={response.data.params}
                    onReset={this.handleReset}
                    onChange={this.handleChange} 
                    onSubmit={this.handleSubmit}/>
                  });
            }
        )
        .catch(function(error) {
                console.log(error);
            }
        )
    }
    
    render() {
        return (
          <div className="pt-5">
            <div className="pt-4">
              <div className="clear-mask mx-1">
                <MDBRow className="m-0 w-100">
                  <MDBCol md="0" lg="1" style={{"maxWidth": "90%"}}/>
                  <MDBCol className="mt-4" md="12" lg="10">
                    {this.state.quitarFilter}
                    {this.state.guitarPicker}
                  </MDBCol>
                  <MDBCol md="0" lg="1" style={{"maxWidth": "90%"}}/>
                </MDBRow>
              </div>
            </div>
          </div>
        );
      }
    }
    
export default GuitarsPage;

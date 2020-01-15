import React, { Component } from "react";
import {
    MDBBtn,
    MDBCol,
    MDBRow,
} from "mdbreact"

class GuitarFilter extends Component {
    constructor(props) {
    super(props);
    this.state = {
        guitars: this.props.guitars,
    };
    this.handleFilterChange = this.props.onChange.bind();
    this.handleFilterSubmit = this.props.onSubmit.bind();
    this.handleFilterReset = this.props.onReset.bind();
  }

  makeGuitarFilter = () => {
    let tmp = [];
    for(var key in this.props.filterParams) {
        tmp.push(<MDBCol>{this.makeGuitarFilterCategory(key,this.props.filterParams[key])}</MDBCol>);
    }
    return <MDBRow>{tmp}</MDBRow>;
  }

  makeGuitarFilterCategory = (categoryName, elements) => {
    let tmp = [];
    tmp.push(<p style={{"fontSize": "130%"}}>{categoryName[0].toUpperCase()+categoryName.slice(1)}</p>)
    elements.forEach(element => {tmp.push(this.makeSingleCheckbox(categoryName,element));});    
    return tmp;
  }

  makeSingleCheckbox = (name, value) => {
    return(
        <div>
            <tr>
                <td><input type="checkbox" onChange={this.handleFilterChange} className="mr-1" name={name}  id={value} value={value}/></td>
                <td><label className="text-capitalize" htmlFor={value}>{value}</label></td>
            </tr>
        </div>
    );
  }

  render() {
    return (
        <form  onReset={this.handleFilterReset}  onSubmit={this.handleFilterSubmit} class="border border-light p-5">
        <p style={{"fontSize": "220%"}}>Kategorie</p>
        <hr className="hr-dark"/>
        {this.makeGuitarFilter()}
        <div className="text-right">
            <MDBBtn type="reset" color="grey">wyczyść filtr</MDBBtn>
            <MDBBtn type="submit" color="mdb-color">filtruj</MDBBtn>
        </div>
        </form>
    );
  }
}

export default GuitarFilter;
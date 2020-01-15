import React from "react";

class ValidationErrorMessage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message,
        };
    }

    render() {
        if(this.props.hidden==true)
            return("");
        else
            return(
                <div className="mt-2 mx-3 bg-white p-2 red-text" style={{'borderRadius': '5px'}}>
                    {this.state.message}
                </div>
            );
    }
}

export default ValidationErrorMessage;
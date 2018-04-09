import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
class DistanceOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userRadius: "",
            userUnit: "",
            selected: ""
        };
        this.makeButtons = this.makeButtons.bind(this);
    }

    onRadioBtnClick(rSelected) {
        this.setState({rSelected});
    }

    makeButtons(){
        let con = this.props.config;
        let but = [];
        for(let i = 0; i < con.units.length; i++){
            but.push(<Button color = "primary" onClick={()=>this.onRadioBtnClick(con.units[i])} active={this.state.rSelected === con.units[i]}>{con.units[i]}</Button>)
        }
        return but;
    }

    render() {
        //todo need to update the options when a button is pressed
        let buttons = this.makeButtons();
        return (
            <ButtonGroup>
                {buttons}
            </ButtonGroup>
        )
    }
}

export default DistanceOptions;



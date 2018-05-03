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
        this.changeOption = this.changeOption.bind(this);
        this.handleRadius = this.handleRadius.bind(this);
        this.handleUnit = this.handleUnit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeOption(arg) {
        //console.log(arg);
        this.props.updateOptions(arg);
        console.log("this.state.",this.props.options);
    }

    onRadioBtnClick(rSelected) {
        this.setState({rSelected});
        console.log(rSelected);
        this.changeOption(rSelected);
    }

    makeButtons(){
        let con = this.props.config;
        let but = [];
        for(let i = 0; i < con.units.length; i++){
            but.push(<Button id="searchGreen" onClick={()=>this.onRadioBtnClick(con.units[i])} active={this.props.trip.options.distance === con.units[i]}>{con.units[i]}</Button>)
        }
        return but;
    }

    handleUnit(event){
        this.setState({userUnit: event.target.value});
    }

    handleRadius(event){
        this.setState({userRadius: event.target.value});
        event.preventDefault();
    }

    handleSubmit(event){
        this.props.updateUserDef(this.state.userUnit, this.state.userRadius);
        alert("Success, radius set to: " + this.state.userRadius);
        event.preventDefault();
    }

    usercond(){
        if(this.props.trip.options.distance === "user defined")
            return <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input type="text" className="form-control" value={this.state.userUnit} onChange={this.handleUnit} />
                    Radius:
                    <input type = "text" className="form-control" value = {this.state.userRadius} onChange={this.handleRadius}/>
                </label>
                <input type="submit" value="Submit" />
            </form>
                ;
    }

    render() {
        //todo need to update the options when a button is pressed
        let buttons = this.makeButtons();
        return (
            <div id="goldButton"><ButtonGroup>
                {buttons}
                {/*<Button color = "primary" onClick={()=>this.onRadioBtnClick("user defined")} active={this.props.trip.options.distance === "user defined"}>user defined</Button>*/}
            </ButtonGroup>
                {this.usercond()}
            </div>
        )
    }
}

export default DistanceOptions;



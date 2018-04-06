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
    }

    onRadioBtnClick(selectedButton) {
        this.setState({ selected: selectedButton });
    }

    render() {
        //todo need to update the options when a button is pressed
        return (
            <ButtonGroup>
                <Button color="primary" onClick={() => this.onRadioBtnClick(1)} active={this.state.rSelected === 1}>Miles</Button>
                <Button color="primary" onClick={() => this.onRadioBtnClick(2)} active={this.state.rSelected === 2}>Kilometers</Button>
                <Button color="primary" onClick={() => this.onRadioBtnClick(3)} active={this.state.rSelected === 3}>Nautical Miles</Button>
                <Button color="primary" onClick={() => this.onRadioBtnClick(4)} active={this.state.rSelected === 4}>User Units</Button>
            </ButtonGroup>
        )
    }
}

export default DistanceOptions;



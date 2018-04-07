import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'reactstrap';

class SideDestinations extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <ButtonToolbar>
                <Button size="sm">Reverse</Button>
                <Button size="sm">+</Button>
                <Button size="sm" block>Plan</Button>
            </ButtonToolbar>
        )
    };

}

export default SideDestinations;

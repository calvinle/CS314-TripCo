import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'reactstrap';
import SearchModal from './SearchModal';

class SideDestinations extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <span>
                <Button>Reverse</Button>
                <SearchModal />
                <Button id="planButton" block>Plan</Button>
            </span>
        )
    };

}

export default SideDestinations;

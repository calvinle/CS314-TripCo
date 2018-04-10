import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'reactstrap';
import SearchModal from './SearchModal';
import DestinationContainer from './DestinationContainer';

class SideDestinations extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <DestinationContainer />
                <span>
                    <Button>Reverse</Button>
                    <SearchModal />
                    <Button id="planButton" block>Plan</Button>
                </span>
            </div>
        )
    };

}

export default SideDestinations;

import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'reactstrap';
import SearchModal from './SearchModal';
import DestinationList from './DestinationList';

class SideDestinations extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <span>
                    <Button>Reverse</Button>
                    <SearchModal />
                </span>
            </div>
        )
    };

}

export default SideDestinations;

import React, { Component } from 'react';
import { ButtonToolbar, Button } from 'reactstrap';
import SearchModal from './SearchModal';
import DestinationList from './DestinationList';

class SideDestinations extends Component {
    constructor(props) {
        super(props);
        this.reverse = this.reverse.bind(this);
    }

    reverse(){
        let temp = this.props.trip.places;
        temp.reverse();
        let testTrip = Object.assign({}, this.props.trip);
        testTrip.places = temp;
        this.props.updateTrip(testTrip);
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

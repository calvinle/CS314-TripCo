import React, { Component } from 'react';
import { ButtonToolbar, InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
import SearchModal from './SearchModal';
import SettingModal from './SettingModal';

class SideDestinations extends Component {
    constructor(props) {
        super(props);
        this.fieldChange = this.fieldChange.bind(this);
        this.plan = this.plan.bind(this);
        /*this.loadTFFI = this.loadTFFI.bind(this);
        this.saveTFFI = this.saveTFFI.bind(this);*/
        this.state = {
            count:0,
            trip: this.props.trip
        };
    }

    fetchResponse() {
        // need to get the request body from the trip in state object.
        let requestBody = this.props.trip;

        console.log(process.env.SERVICE_URL);
        console.log(requestBody);

        return fetch('http://' + location.host + '/plan', {
            header: {'Access-Control-Allow-Origin':'*'},
            method: "POST",
            body: JSON.stringify(requestBody)
        });
    }

    async plan() {
        try {
            let serverResponse = await this.fetchResponse();
            //response.header("Access-Control-Allow-Origin", "*");
            let tffi = await serverResponse.json();
            console.log(tffi);
            this.props.updateTrip(tffi);
        } catch (err) {
            console.error(err);
        }
    }

    fieldChange(event) {
        this.props.updateTitle(event.target.value);
    }

    render() {
        return (
            <span>
                <Input placeholder="Name My Trip" type="text" value={this.props.trip.title} onChange={this.fieldChange}/>
                <p></p>
                <DestinationList trip={this.state.trip}/>

                {/*<p> Load my existing trip:</p>
                <Input type="file" name="file" onChange={this.loadTFFI} id="tffifile" />*/}

                <p> Continue creating the trip by adding destinations.</p>
                <SearchModal config = {this.props.config} query={this.props.query} addPlace= {this.props.addPlace} updateQuery = {this.props.updateQuery}/>

                <p></p>
                <p> When you're ready to see your trip, click plan. </p>
                <Button id={"searchGreen"}  disabled={!this.props.trip.title} onClick={this.plan} type="button">Plan</Button>

                <p></p>
            </span>
        )
    };

}

export default SideDestinations;

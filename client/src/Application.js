import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import {Container, Row, Col, Table} from 'reactstrap';
import Map from './Map';
import Itinerary from './Itinerary';
import Options from './Options';
import Destinations from './Destinations';
import Trip from './Trip';
import Dropdown from './Dropdown';
import Database from "./Database";
import '../css/styles.css';
import SideDestinations from "./SideDestinations";
import GoogleMap from './GoogleMap';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: { // default TFFI
                type: "trip",
                title: "",
                options: {distance: "miles", userUnit: "", userRadius: "", optimization: "0"},
                places: [],
                distances: [],
                map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
            },
            config: {
                type: "",
                version: "",
                filters: [],
                maps: [],
                optimization: "",
                units: []
            },
            count:0
        }
        this.updateTrip = this.updateTrip.bind(this);
        this.updateTitle = this.updateTitle.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.updateStart = this.updateStart.bind(this);
        this.updateOptimization = this.updateOptimization.bind(this);
        this.updateUserDef = this.updateUserDef.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.reduceList = this.reduceList.bind(this);
        this.updateConfig = this.updateConfig.bind(this);
        this.config = this.config.bind(this);
        this.fetchResponse = this.fetchResponse.bind(this);
        this.updateCount = this.updateCount.bind(this);
    }

    componentDidMount() {
        console.log("DID MOUNT");
        this.config();
        console.log(this.state.config);
    }

    updateCount(arg){
        console.log("updateCount",arg);
        this.setState({count: arg});
    }


    fetchResponse() {
        console.log("Fetching");
        return fetch('http://' + location.host + '/config');
    }

    async config() {
        try {
            let serverResponse = await this.fetchResponse();
            let tffi = await serverResponse.json();
            console.log("RESPONSE", tffi);
            this.updateConfig(tffi);
        } catch (err) {
            console.error(err);
        }
    }

    updateTrip(tffi) {
        console.log("updateTrip");
        console.log(tffi);
        this.setState({trip: tffi});
    }

    updateConfig(tffi) {
        console.log("updateConfig");
        this.setState({config: tffi});
    }

    reduceList(place) {
        var newPlaces = this.state.trip.places;
        if (place.length <= 7) {
            var newStart = newPlaces.find(x => x.id === place);
            var index = newPlaces.indexOf(newStart);
            if (index === 0) {
                newPlaces.splice(index, 1);
                newPlaces.splice(newPlaces.length - 1, 1);
                newPlaces.push(newPlaces[0]);
            }
            else {
                newPlaces.splice(index, 1);
            }
        }
        else {
        }
        var testTrip = Object.assign({}, this.state.trip);
        testTrip.places = newPlaces;
        this.setState({trip: testTrip});
    }

    updateStart(options) {
        var newPlaces = this.state.trip.places;
        if (options !== "Select...") {
            var newStart = newPlaces.find(x => x.id === options);
            var index = newPlaces.indexOf(newStart);
            newPlaces.splice(index, 1);
            newPlaces.unshift(newStart);
            newPlaces.splice(newPlaces.length - 1, 1);
            newPlaces.push(newStart);
        }
        else {
        }
        console.log(newPlaces);
        console.log("in Application start:", options);
        var testTrip = Object.assign({}, this.state.trip);
        testTrip.places = newPlaces;
        //testTrip.options.start = options;
        this.setState({trip: testTrip});
        //console.log("new option",testTrip);
        //console.log("testTrip:", testTrip);
        // update the options in the trip.
    }

    updateTitle(title){
        let testTrip = Object.assign({},this.state.trip);
        testTrip.title = title;
        this.setState({trip:testTrip});
    }

    updateOptions(options) {
        console.log("in Application options:", options);
        var testTrip = Object.assign({}, this.state.trip);
        testTrip.options.distance = options;
        this.setState({trip: testTrip});
        //console.log("testTrip:", testTrip);
        // update the options in the trip.
    }

    updateUserDef(unit, radius) {
        let testTrip = Object.assign({}, this.state.trip);
        testTrip.options.userRadius = radius;
        testTrip.options.userUnit = unit;
        this.setState({trip: testTrip});
        console.log("USERDEF", this.state.trip);
    }

    addPlace(place) {
        console.log("add place,", place);
        let testTrip = Object.assign({}, this.state.trip);
        testTrip.places.push(place);
        //console.log(testTrip);
        this.setState({trip: testTrip});
    }

    updateOptimization(options) {
        console.log("in Application optimization:", options);
        var testTrip = Object.assign({}, this.state.trip);
        testTrip.options.optimization = options;
        this.setState({trip: testTrip});
        //console.log("testTrip:", testTrip);
    }

    render() {
        return (
            <div>
                <Header config={this.state.config} trip={this.state.trip} updateOptimization={this.updateOptimization}
                        updateTrip={this.updateTrip} updateTitle={this.updateTitle} updateUserDef={this.updateUserDef}
                        updateOptions={this.updateOptions} updateCount = {this.updateCount}/>
                <Row className="show-grid" id="mainContent">
                    <Col id="sidenav" sm={3}>
                        Destinations
                        <p>There are {this.state.count} destinations. </p>
                        <hr/>
                        <SideDestinations trip={this.state.trip} updateTrip={this.updateTrip}/>
                    </Col>
                    <Col sm={9}>
                        <div id="map"></div>
                        <Row className="show-grid">
                            {/*<Col sm={12}>
                                <Options options={this.state.trip.options} config={this.state.config}
                                         updateOptions={this.updateOptions} updateUserDef={this.updateUserDef}
                                         updateOptimization={this.updateOptimization}/>
                            </Col>*/}

                            {/*<Col sm={12}>
                                <Dropdown trip={this.state.trip} config={this.state.config}
                                          updateStart={this.updateStart}
                                          reduceList={this.reduceList}/>
                            </Col>*/}

                            {/*<Col sm={12}>
                                <Destinations trip={this.state.trip} config={this.state.config}
                                              updateTrip={this.updateTrip}/>
                            </Col>*/}
                            <Col sm={12}>
                                <Database trip={this.state.trip} config={this.state.config} addPlace={this.addPlace}/>
                            </Col>
                            {/*<Col sm={12}>
                                <Trip trip={this.state.trip} config={this.state.config} updateTrip={this.updateTrip}/>
                            </Col>*/}
                            <Col sm={12}>
                                <div id="trip" className="card border-0 border-dark">
                                    <div className="card-body">
                                        <Map trip={this.state.trip}/>
                                        <Itinerary trip={this.state.trip}/>
                                        <GoogleMap />
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Footer number = {this.props.number} name = {this.props.name}/>
            </div>
        )
    }
}

export default Application;

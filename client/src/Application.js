import React, {Component} from 'react';
import Header from './Header';
import Footer from './Footer';
import {Container, Row, Col, Table} from 'reactstrap';
import Itinerary from './Itinerary';
import '../css/styles.css';
import SideDestinations from "./SideDestinations";
import GoogleMapDisplay from './GoogleMapDisplay';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: { // default TFFI
                version:0,
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
            query: { // query TFFI
                version: 4,
                type: "query",
                //limit: "3" @TODO: decide on the name (in this case, limit). Also, if the number is int or string
                query: "",
                places: [],
                limit: 30,
                filters:[
                    {   "attribute" : "",
                        "values" : []
                    }]
            },
            count:0,
            host : location.host
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
        this.updateQuery = this.updateQuery.bind(this);
        this.query = this.query.bind(this);
        this.fetchResponse1 = this.fetchResponse1.bind(this);
        this.updateCount = this.updateCount.bind(this);
        this.updatePort = this.updatePort.bind(this);
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
        console.log("Fetching", this.state.host);
        return fetch('http://' + this.state.host + '/config',
            {
                header: {'Access-Control-Allow-Origin':'*'}
            });
    }


    async config() {
        try {
            let serverResponse = await this.fetchResponse();
            let tffi = await serverResponse.json();
            console.log("RESPONSE", tffi);
            this.updateConfig(tffi);
        } catch (err) {
            console.error(err);
            if(this.state.host !== "localhost:8088")
            alert("Attempted to contact server that did not return config in proper format. Config has been kept the same as on boot.");
            /*this.updateConfig({
                type: "",
                    version: "",
                    filters: [],
                    maps: [],
                    optimization: "",
                    units: []
            });*/
        }
    }

    fetchResponse1() {
        console.log("Fetching", this.state.host);
        return fetch('http://' + this.state.host + '/query',
            {
                header: {'Access-Control-Allow-Origin':'*'}
            });
    }

    async query() {
        try {
            let serverResponse = await this.fetchResponse1();
            let tffi = await serverResponse.json();
            console.log("RESPONSE", tffi);
            this.updateQuery(tffi);
        } catch (err) {
            console.error(err);
        }
    }

    updateTrip(tffi) {
        console.log("updateTrip");
        console.log(tffi);
        if (typeof tffi.distances === 'undefined')
        {
            this.setState({
                trip: {
                        version: 3,
                        type: "trip",
                        title: tffi.title,
                        options: tffi.options,
                        places: tffi.places,
                        distances: [],
                        map: tffi.map }
            } );
        }
        else
            this.setState({trip: tffi});

    }

    updateConfig(tffi) {
        console.log("updateConfig");
        this.setState({config: tffi});
    }

    updateQuery(tffi) {
        console.log("updateQuery");
        console.log(tffi);
        this.setState({query: tffi});
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

    updatePort(host,port){
        let newport = host + ":"+port;
        this.setState({host:newport},this.config);
        //console.log("host1", newport);
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
                <Header config={this.state.config} trip={this.state.trip} query={this.state.query} host={this.state.host} updateOptimization={this.updateOptimization}
                        updateTrip={this.updateTrip} updateTitle={this.updateTitle} updateUserDef={this.updateUserDef} updatePort = {this.updatePort}
                        updateOptions={this.updateOptions} updateCount = {this.updateCount} updateQuery = {this.updateQuery}/>
                <Row className="show-grid" id="mainContent">
                    <Col id="sidenav" sm={3}>
                        <p>

                        </p>
                        <p>
                            Start your trip below!
                        </p>
                        <hr/>

                        <SideDestinations updateTitle={this.updateTitle} updatePort = {this.updatePort} config ={this.state.config} addPlace={this.addPlace}
                                          query={this.state.query} updateQuery = {this.updateQuery} trip={this.state.trip} host={this.state.host}
                                          updateTrip={this.updateTrip} updateOptimization={this.updateOptimization} updateOptions={this.updateOptions}/>

                    </Col>
                    <Col sm={9}>
                        <Itinerary trip={this.state.trip} />
                        <GoogleMapDisplay trip={this.state.trip} />
                    </Col>
                </Row>
                <Footer number = {this.props.number} host ={this.state.host} name = {this.props.name}/>
            </div>
        )
    }
}

export default Application;

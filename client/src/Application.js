import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Options from './Options';
import Destinations from './Destinations';
import Trip from './Trip';
import Dropdown from './Dropdown';
import Database from "./Database";

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
            }
        }
        this.updateTrip = this.updateTrip.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.updateStart = this.updateStart.bind(this);
        this.updateOptimization = this.updateOptimization.bind(this);
        this.updateUserDef = this.updateUserDef.bind(this);
        this.addPlace = this.addPlace.bind(this);
        this.reduceList = this.reduceList.bind(this);
    }

    updateTrip(tffi) {
        console.log("updateTrip");
        console.log(tffi);
        this.setState({trip: tffi});
    }

    reduceList(place){
      var newPlaces = this.state.trip.places;
      if (place.length <= 7) {
        var newStart = newPlaces.find(x => x.id === place);
        var index = newPlaces.indexOf(newStart);
        if (index === 0){
          newPlaces.splice(index, 1);
          newPlaces.splice(newPlaces.length-1, 1);
          newPlaces.push(newPlaces[0]);
        }
        else{
          newPlaces.splice(index, 1);
        }
      }
      else{}
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
      newPlaces.push(newStart);}
    else {}
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

    updateOptions(options) {
        console.log("in Application options:", options);
        var testTrip = Object.assign({}, this.state.trip);
        testTrip.options.distance = options;
        this.setState({trip: testTrip});
        //console.log("testTrip:", testTrip);
        // update the options in the trip.
    }

    updateUserDef(unit,radius){
        let testTrip = Object.assign({}, this.state.trip);
        testTrip.options.userRadius = radius;
        testTrip.options.userUnit = unit;
        this.setState({trip: testTrip});
        console.log("USERDEF", this.state.trip);
    }

    addPlace(place){
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
            <Grid>
                <Row className="show-grid">
                    <Col id="sidenav" sm={3}>
                       
                    </Col>
                    <Col sm={9}>
                        <Row className="show-grid">
                            <Col sm={12}>
                                <Options options={this.state.trip.options} updateOptions={this.updateOptions} updateUserDef={this.updateUserDef} updateOptimization={this.updateOptimization} />
                            </Col>

                            <Col sm={12}>
                                <Dropdown trip={this.state.trip} updateStart={this.updateStart} reduceList={this.reduceList} />
                            </Col>

                            <Col sm={12}>
                                <Destinations trip={this.state.trip} updateTrip={this.updateTrip} />
                            </Col>
                            <Col sm={12}>
                                <Database trip={this.state.trip} addPlace={this.addPlace} />
                            </Col>
                            <Col sm={12}>
                                <Trip trip={this.state.trip} updateTrip={this.updateTrip} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Application;

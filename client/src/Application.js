import React, {Component} from 'react';
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
                options: {distance: "miles", start: "", optimization: "0"},
                places: [],
                distances: [],
                map: "<svg width=\"1920\" height=\"20\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:svg=\"http://www.w3.org/2000/svg\"><g></g></svg>"
            }
        }
        this.updateTrip = this.updateTrip.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.updateStart = this.updateStart.bind(this);
        this.updateOptimization = this.updateOptimization.bind(this);
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
        var newStart = newPlaces.find(x => x.id == place);
        var index = newPlaces.indexOf(newStart);
        if (index == 0){
          newPlaces.splice(index, 1);
          newPlaces.splice(newPlaces.length-1, 1);
          newPlaces.push(newPlaces[0]);
        }
        else{
          newPlaces.splice(index, 1);
        }
      }
      else{}
      var testTrip = Object.assign({}, this.state.trip, {
            type: this.state.trip.type,
            title: this.state.trip.title,
            options: {start: this.state.trip.options.start, distance: this.state.trip.options.distance, optimization: this.state.trip.options.optimization},
            places: newPlaces,
            distances: this.state.trip.distances,
            map: this.state.trip.map,
          }
      )
      this.setState({trip: testTrip});
    }

  updateStart(options) {
    var newPlaces = this.state.trip.places;
    if (options != "Select...") {
      var newStart = newPlaces.find(x => x.id == options);
      var index = newPlaces.indexOf(newStart);
      newPlaces.splice(index, 1);
      newPlaces.unshift(newStart);
      newPlaces.splice(newPlaces.length - 1, 1);
      newPlaces.push(newStart);}
    else {}
    console.log(newPlaces);
    console.log("in Application:", options);
    var testTrip = Object.assign({}, this.state.trip, {
          type: this.state.trip.type,
          title: this.state.trip.title,
          options: {start: options, distance: this.state.trip.options.distance, optimization: this.state.trip.options.optimization},
          places: newPlaces,
          distances: this.state.trip.distances,
          map: this.state.trip.map,
        }
    )
    this.setState({trip: testTrip});
    //console.log("new option",testTrip);
    //console.log("testTrip:", testTrip);
    // update the options in the trip.
  }

    updateOptions(options) {
        console.log("in Application:", options);
        var testTrip = Object.assign({}, this.state.trip, {
                type: this.state.trip.type,
                title: this.state.trip.title,
                options: {
                    distance: options,
                    start: this.state.trip.options.start,
                    optimization: this.state.trip.options.optimization
                },
                places: this.state.trip.places,
                distances: this.state.trip.distances,
                map: this.state.trip.map,
            }
        )
        this.setState({trip: testTrip});
        //console.log("testTrip:", testTrip);
        // update the options in the trip.
    }

    addPlace(place){
        console.log("add place,", place);
        let testTrip = Object.assign({}, this.state.trip);
        testTrip.places.push(place);
        console.log(testTrip);
        this.setState({trip: testTrip});
    }

    updateOptimization(options) {
        console.log("in Application:", options);
        var testTrip = Object.assign({}, this.state.trip, {
                type: this.state.trip.type,
                title: this.state.trip.title,
                options: {
                    optimization: options,
                    start: this.state.trip.options.start,
                    distance: this.state.trip.options.distance
                },
                places: this.state.trip.places,
                distances: this.state.trip.distances,
                map: this.state.trip.map,
            }
        )
        this.setState({trip: testTrip});
        //console.log("testTrip:", testTrip);
    }


    render() {
        return (
            <div id="application" className="container">
                <div className="row">
                    <div className="col-12">
                        <Options options={this.state.trip.options} updateOptions={this.updateOptions} updateOptimization={this.updateOptimization}/>
                    </div>

                    <div className="col-12">
                        <Dropdown trip={this.state.trip} updateStart={this.updateStart} reduceList={this.reduceList}/>
                    </div>

                    <div className="col-12">
                        <Destinations trip={this.state.trip} updateTrip={this.updateTrip}/>
                    </div>
                    <div className="col-12">
                      <Database trip={this.state.trip} addPlace = {this.addPlace}/>
                    </div>
                    <div className="col-12">
                        <Trip trip={this.state.trip} updateTrip={this.updateTrip}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Application;

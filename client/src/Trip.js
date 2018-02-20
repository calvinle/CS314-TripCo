import React, {Component} from 'react';
import Map from './Map';
import Itinerary from './Itinerary';

/* Trip computes the map an intinerary based on a set of destinations and options.
 * The destinations and options reside in the parent object so they may be set by
 * the Destinations and Options classes.
 * The map and itinerary reside in this object so they can be passed to the Map and Itinerary classes.
 */
class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripTitle: ''
    };
    this.plan = this.plan.bind(this);
    this.fieldChange = this.fieldChange.bind(this);
    this.destroyClickedElement = this.destroyClickedElement.bind(this);
    this.saveTFFI = this.saveTFFI.bind(this);
  }

  /* Sends a request to the server with the destinations and options.
   * Receives a response containing the map and itinerary to update the
   * state for this object.
   */
  fetchResponse(){
    // need to get the request body from the trip in state object.
    let requestBody = this.props.trip;

    console.log(process.env.SERVICE_URL);
    console.log(requestBody);

    return fetch('http://' + location.host +'/plan', {
      method:"POST",
      body: JSON.stringify(requestBody)
    });
  }

  async plan(){
    try {
      let serverResponse = await this.fetchResponse();
      let tffi = await serverResponse.json();
      console.log(tffi);
      this.props.updateTrip(tffi);
    } catch(err) {
      console.error(err);
    }
  }

  fieldChange(event){
    this.setState({tripTitle: event.target.value});
  }

  destroyClickedElement(event){
    document.body.removeChild(event.target);
  }

  /* Saves the map and itinerary to the local file system.
   */

  //Download function help found here:
  //https://thiscouldbebetter.wordpress.com/2012/12/18/loading-editing-and-saving-a-text-file-in-html5-using-javascrip/
  saveTFFI(){
    let contents = this.props.trip;
    contents.title = this.state.tripTitle;

    let textToSave = JSON.stringify(contents);
    let textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    let textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    let fileNameToSaveAs = this.state.tripTitle;

    let downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = this.destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
  }

  /* Renders the buttons, map, and itinerary.
   * The title should be specified before the plan or save buttons are valid.
   */
  render(){
    return(
        <div id="trip" className="card">
          <div className="card-header bg-info text-white">
            Trip
          </div>
          <div className="card-body">
            <p>Give your trip a title before planning or saving.</p>
            <div className="input-group" role="group">
              <span className="input-group-btn">
              <button className="btn btn-primary " disabled={!this.state.tripTitle} onClick={this.plan} type="button">Plan</button>
            </span>
              <input type="text" className="form-control" value={this.state.tripTitle} onChange={this.fieldChange} placeholder="Trip title..."/>
              <span className="input-group-btn">
              <button className="btn btn-primary " disabled={!this.state.tripTitle} onClick={this.saveTFFI} type="button">Save</button>
            </span>
            </div>
            <Map trip={this.props.trip} />
            <Itinerary trip={this.props.trip} />
          </div>
        </div>
    )
  }
}

export default Trip;
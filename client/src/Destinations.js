import React, {Component} from 'react';

/* Destinations reside in the parent object so they may be shared
 * with the Trip object.
 * Renders the current destination list.
 * Loads destinations from files.
 * Finds destinations in a database.
 * Displays the current number of destinations
 */
class Destinations extends Component {
  constructor(props) {
    super(props);
    this.loadTFFI = this.loadTFFI.bind(this);
    this.state = {count: 0};
  }

  loadTFFI(event) {
    console.log(event.target.files[0].name);
    // now you need to read the file and create a JSON.
    //Found via StackOverflow and modified:
    //https://stackoverflow.com/questions/3582671/how-to-open-a-local-disk-file-with-javascript
    let file = event.target.files[0];
    if(!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function(event) {
      let fileContents = JSON.parse(event.target.result);
      if(fileContents.hasOwnProperty('places') &&
          fileContents.hasOwnProperty('type') &&
          fileContents.hasOwnProperty('title') &&
          fileContents.hasOwnProperty('options') &&
          fileContents.hasOwnProperty('distances') &&
          fileContents.hasOwnProperty('map')){
        this.setState({
          count: fileContents.places.length
        });
        this.props.updateTrip(fileContents);
      }
      else{
        alert("File data is corrupt. Please review file format,"
            + " or create new file below.");
        this.setState({
          count: 0
        });
      }
    }.bind(this);
    reader.readAsText(file);
    // then you need to set the trip property
    // this.props.updateTrip(??);
  }

  render() {
    // need to clean up the button
    return (
        <div id="destinations" className="card">
          <div className="card-header bg-info text-white">
            Destinations
          </div>
          <div className="card-body">
            <p>Load destinations from a file.</p>
            <div className="form-group" role="group">
                <input type="file" className="form-control-file" onChange={this.loadTFFI} id="tffifile" />
            </div>
            <h5>There are {this.state.count} destinations. </h5>
          </div>
        </div>
    )
  }
}

export default Destinations;
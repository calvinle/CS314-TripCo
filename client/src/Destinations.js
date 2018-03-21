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

  validTFFI(fileContents)
  {

      let myArray1 = ["type", "title", "options", "places", "distances", "map"];
      let myArray2 = ["type", "title", "options", "places", "distances", "map", "version", "query"];
      let flag = true;
      let key = [];
      let i;

      for(let s in fileContents)
      {
          key.push(s);
      }
      console.log("key: ", key.length);

      for(i = 0; i< key.length; i++)
      {
          if (key.length === 8) {
              console.log("HERE length 8: ");
              console.log("test: ", (myArray2[i]));
              if (!fileContents.hasOwnProperty(myArray2[i])) {
                  console.log("HERE length 81111: ");
                  flag = false;
              }
          }

          else if (key.length === 6) {
              console.log("HERE length 6: ");
              if (!fileContents.hasOwnProperty(myArray1[i])) {
                  console.log("HERE length 61111: ");
                  flag = false;
              }
          }

          else
              return false;

      }


      if(!flag){
          return false;
      }

      if(fileContents.distances[0] !== 0) {
              fileContents.places.push(fileContents.places[0]);
              fileContents.distances.unshift(0);
              return true;
          }

  }

    alertMsg()
    {
        alert("File data is corrupt. Please review file format, or create new file below.");
        this.setState({ count: 0 });
    }

   loadTFFI(event) {
    console.log(event.target.files[0].name);
    //Found via StackOverflow and modified:
    //https://stackoverflow.com/questions/3582671/how-to-open-a-local-disk-file-with-javascript
    let file = event.target.files[0];
    if(!file) {
      return;
    }
    let reader = new FileReader();
    reader.onload = function(event) {
      let fileContents = JSON.parse(event.target.result);
      if(this.validTFFI(fileContents)){
        this.setState({count: fileContents.places.length - 1});
        this.props.updateTrip(fileContents);
      }
      else{
        this.alertMsg();
      }
    }.bind(this);
    reader.readAsText(file);
    // then you need to set the trip property
    // this.props.updateTrip(??);
  }

  render() {
    // need to clean up the button
    return (
        <div id="destinations" className="card border-0 border-dark">
          <div className="card-header bg-primary text-light">
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

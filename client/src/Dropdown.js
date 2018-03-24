import React, {Component} from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    //this.state = {value: ''};
    this.changeStart = this.changeStart.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createDropElements = this.createDropElements.bind(this);
    this.removePlace = this.removePlace.bind(this);
    this.deletePlace = this.deletePlace.bind(this);
  }

  removePlace(event) {
    console.log(document.getElementById("deleteForm").value);
    this.deletePlace(document.getElementById("deleteForm").value);
  }

  deletePlace(arg) {
    this.props.reduceList(arg);
  }

  changeStart(arg) {
    this.props.updateStart(arg);
    //event.preventDefault();
  }

  //Credit for the following two methods' skeletons https://stackoverflow.com/questions/36205673/how-do-i-create-a-dynamic-drop-down-list-with-react-bootstrap
  createDropElements() {
    //console.log(this.props.trip.places.length);
    let element = this.props.trip.places.map(
        (item) => <option key={item.id} value={item.id}>{item.name}</option>);
    element.splice(-1, 1);
    element.push(<option key="hey">Select...</option>);
    return element;
  }

  handleChange(event) {
    //console.log(event.target.value);
    this.changeStart(event.target.value);
  }

  render() {
    let drop = this.createDropElements();
    return (
        <div id="dropdown" className="card border-0 border-dark">
            <div className="card-header bg-primary text-light">
                Trip Modifier
            </div>
            <div className="card-body">
                <form>
                    <label><p>If you would like to pick a different starting
                        point then specified, please select one from the
                        dropdown menu.</p>
                        <select onChange={this.handleChange}>
                          {drop};
                        </select>
                    </label>
                </form>

                <div>
                    <form>
                        <label><p> Alternatively, if you would like to remove a
                            destination from your trip, select it from the
                            following dropdown menu and it will be removed. </p>
                            <select id={"deleteForm"}>
                              {drop};
                            </select> &emsp;
                            <button type="button" className="btn btn-danger"
                                    onClick={this.removePlace}>Delete
                            </button>
                        </label>
                    </form>
                </div>

            </div>
        </div>


    );
  }
}

export default Dropdown;
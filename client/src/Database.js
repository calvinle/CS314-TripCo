import React, {Component} from 'react';

class Database extends Component{
  constructor(props) {
    super(props);

  }

  render() {

    return (

        <div id="database" className="card border-0 border-dark">
          <div className="card-header bg-primary text-light">
            Search
          </div>
          <div className="card-body">

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Search</span>
              </div>
              <input type="text" className="form-control" placeholder="Denver International Airport"></input>
            </div>
          </div>
        </div>
  )
  }
  }

  export default Database;
import React, {Component} from 'react';

class Database extends Component{
  constructor(props) {
    super(props);

  }

  render() {

    return(

        <div id="database" className="card border-0 border-dark">
          <div className="card-header bg-primary text-light">
          Search
        </div>
          <div className="card-body">
          AND HIS NAME IS JOHN CENA
        </div>
        </div>
    )
  }
}

export default Database;
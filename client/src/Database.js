import React, {Component} from 'react';

class Database extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: { // query TFFI
                version: "2",
                type: "query",
                query: "",
                places: []
            }
        };

        this.updateQuery = this.updateQuery.bind(this);
    }

    newQuery(arg) {
        //this.props.updateOptions(arg);
        console.log("in Database.js: ", arg);
        var testQuery = Object.assign({}, this.state.query, {
            version: this.state.query.version,
            type: this.state.query.type,
            query: arg,
            places: this.state.query.places
        })
        this.setState({query: testQuery});
        console.log("testQuery: ", testQuery);

        //@TODO: send the value somewhere
    }

    updateQuery(event) {
        console.log(event.target.value);
        this.newQuery(event.target.value);
    }

    render() {

        return (
            <div id="database" className="card border-0 border-dark">
                <div className="card-header bg-primary text-light">
                    Search
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <span className="input-group-btn">

              <button className="btn btn-success " id="query" onClick={this.updateQuery.bind(this)} type="button">Search</button>
            </span>
                        <input type="text" id="query" className="form-control" placeholder="Search for..."
                               onChange={this.updateQuery.bind(this)}></input>

                    </div>
                </div>
            </div>
        )
    }
}


export default Database;
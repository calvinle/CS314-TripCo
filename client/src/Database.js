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

    }

    updateQuery(event) {
        console.log(document.getElementById("query").value);
        this.newQuery(document.getElementById("query").value);
    }

    render() {

        return (
            <div id="database" className="card border-0 border-dark">
                <div className="card-header bg-primary text-light">
                    Search
                </div>
                <div className="card-body">
                    <div className="input-group mb-3">
                        <div onClick={this.updateQuery.bind(this)}>
                            <button className="btn btn-success " id="queryButton"  type="button">Search</button>
                        <input type="text" id="query" className="form-control" placeholder="Search for..."></input>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Database;
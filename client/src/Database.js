import React, {Component} from 'react';
import SearchTable from './SearchTable';

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

        this.updateQ = this.updateQ.bind(this);
    }

    updateQuery(tffi) {
        console.log("updateTrip");
        console.log(tffi);
        this.setState({query: tffi});
    }

    fetchResponse(){
        // need to get the request body from the trip in state object.
        let requestBody = this.props.query;

        console.log(requestBody);

        return fetch('http://' + location.host +'/query', {
            method:"POST",
            body: JSON.stringify(requestBody)
        });
    }

    async plan(){
        try {
            let serverResponse = await this.fetchResponse();
            let tffi = await serverResponse.json();
            console.log(tffi);
            this.props.updateQuery(tffi);
        } catch(err) {
            console.error(err);
        }
    }


    newQuery(arg) {
        //this.props.updateOptions(arg);
        console.log("in Database.js: ", arg);
        var testQuery = Object.assign({}, this.state.query, {
            version: this.state.query.version,
            type: this.state.query.type,
            query: arg,
            places: this.state.query.places
        });
        console.log("testQuery: ", testQuery);
        this.setState({query: testQuery});
    }

    updateQ(event) {
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
                    <div className="input-group-prepend">
                        <div onClick={this.updateQ.bind(this)}>
                            <button className="btn btn-success " id="queryButton"  type="button">Search</button>
                        </div>
                        <input type="text" id="query" className="form-control" placeholder="Location"></input>
                    </div>
                    <SearchTable query={this.props.query} />
                </div>
            </div>
        )
    }
}


export default Database;

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
        this.updateQuery = this.updateQuery.bind(this);
        this.fetchResponse = this.fetchResponse.bind(this);
        this.plan = this.plan.bind(this);
        this.conditionalSearch = this.conditionalSearch.bind(this);
    }

    updateQuery(tffi) {
        console.log("updateQuery");
        console.log(tffi);
        this.setState({query: tffi});
    }

    fetchResponse(tQuery){
        // need to get the request body from the trip in state object.
        //let requestBody = this.state.query;
        let requestBody = tQuery;
        console.log("request body", requestBody);

        return fetch('http://' + location.host +'/query', {
            method:"POST",
            body: JSON.stringify(requestBody)
        });
    }

    async plan(tQuery){
        try {
            console.log(this.state.query);
            let serverResponse = await this.fetchResponse(tQuery);
            let tffi = await serverResponse.json();
            console.log("in asyncPlan: ", tffi);
            this.updateQuery(tffi);
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
        //this.setState({query: testQuery});
        this.plan(testQuery);
    }

    updateQ(event) {
        console.log(document.getElementById("query").value);
        this.newQuery(document.getElementById("query").value);
    }

    conditionalSearch(){
       if(this.state.query.query !== ""){
           return <SearchTable query={this.state.query}/>
       }
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
                            <button className="btn btn-success " id="queryButton" type="button">Search</button>
                        </div>
                        <input type="text" id="query" className="form-control" placeholder="Location"></input>
                    </div>
                    {this.conditionalSearch()}
                </div>
            </div>
        )
    }
}


export default Database;

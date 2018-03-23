
import React, {Component} from 'react';

class SearchTable extends Component {
    constructor(props) {
        super(props);
        this.createTable = this.createTable.bind(this);
        this.addEntry = this.addEntry.bind(this);
        //let tableVar;
    }

    createTable () {

        let dests = this.props.query.places.map((item) => <td>{item.name}</td>);
        console.log("ANYTHING AT ALL");
        //let dests = this.props.query.places.map((item) => <td>{item.name}</td>);
        console.log(this.props.query);

        return {dests};
    }


    addButton(){
        for(let i =0; i<this.props.query.places.length;){
            this.addEntry(this.props.query.places.pop());
        }
        //this.addEntry(event.target.id);
    }

    addEntry(arg){
        this.props.addEntryDB(arg);
    }


    render() {
        let table = this.createTable();

        return <div id="SearchTable">
            <h4>Search Results </h4>
            <table className="table table-responsive table-bordered">
                <thead>
                <tr className="table-primary">
                    <th className="align-middle">Name:</th>
                    {table.dests}
                </tr>
                </thead>
            </table>
            <div className="card-body">
                <div className="input-group-prepend">
                    <div onClick={this.addButton.bind(this)}>
                        <button className="btn btn-success " id="add" type="button">Add</button>
                    </div>
                </div>
            </div>

        </div>
    }
}

export default SearchTable;

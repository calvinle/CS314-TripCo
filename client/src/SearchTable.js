
import React, {Component} from 'react';

class SearchTable extends Component {
    constructor(props) {
        super(props);
        this.createTable = this.createTable.bind(this);
    }

    createTable () {
       //let dests = this.props.trip.places.map((item) => <td>{item}</td>);

        let dests = this.props.trip;
        console.log(this.props.query);

        return {dests};
    }

    render() {
        let table = this.createTable();

        return <div id="SearchTable">
            <h4>Search Results </h4>
            <table className="table table-responsive table-bordered">
                <thead>
                <tr className="table-primary">
                    <th className="align-middle">Search Results</th>
                    {table.dests}
                </tr>
                </thead>
            </table>
        </div>
    }
}

export default SearchTable;


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
        let buttons = [];
        for(let i = 0; i < dests.length; i++){
            buttons.push(<td><div className="input-group-prepend">
                <div onClick={this.addButton.bind(this)}>
                    <button className="btn btn-danger " id={i} type="button">Add</button>
                </div>
            </div></td>)
        }
        console.log("ANYTHING AT ALL");
        //let dests = this.props.query.places.map((item) => <td>{item.name}</td>);
        console.log(this.props.query);

        return {dests,buttons};
    }


    addButtonAll(){
        for(let i =0; i<this.props.query.places.length;){
            this.addEntry(this.props.query.places.pop());
        }
        //this.addEntry(event.target.id);
    }

    addButton(event){
        //for(let i =0; i<this.props.query.places.length;){
            this.addEntry(this.props.query.places[event.target.id]);
            this.props.query.places.splice(event.target.id, 1);
        //}
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

                <tbody>
                <tr>
                    <th className="table-danger align-middle">Click to add</th>
                    {table.buttons}
                </tr>
                </tbody>

            </table>
            <div className="card-body">
                <div className="input-group-prepend">
                    <div onClick={this.addButtonAll.bind(this)}>
                        <button className="btn btn-success " id="add" type="button">Add All</button>
                    </div>
                </div>
            </div>

        </div>
    }
}

export default SearchTable;


import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';

class SearchTable extends Component {
    constructor(props) {
        super(props);
        this.createTable = this.createTable.bind(this);
        this.addEntry = this.addEntry.bind(this);
        //let tableVar;
    }

    createTable () {

        //clears table before a new one is loaded.
        let dests = [];
        dests = this.props.query.places.map((item) => <td>{item.name}</td>);                      
        let buttons = [];
        for(let i = 0; i < dests.length; i++){
            buttons.push(<td><div className="input-group-prepend">
                <div onClick={this.addButton.bind(this)}>
                    <Button size = "sm" id={"oOutline"} name={i} type="button">Add</Button>
                </div>
            </div></td>)
        }
        console.log("ANYTHING AT ALL");
        //let dests = this.props.query.places.map((item) => <td>{item.name}</td>);
        console.log(this.props.query);
        let count = dests.length;
        console.log(count);
        return {dests,buttons, count};
    }


    addButtonAll(){
        for(let i =0; i<this.props.query.places.length;){
            this.addEntry(this.props.query.places.pop());
        }
        //this.addEntry(event.target.id);
    }

    addButton(event){
        //for(let i =0; i<this.props.query.places.length;){
            this.addEntry(this.props.query.places[event.target.name]);
            this.props.query.places.splice(event.target.name, 1);
        //}
        //this.addEntry(event.target.id);
    }

    addEntry(arg){
        this.props.addPlace(arg);
    }


    render() {
        let table = this.createTable();

        return <div id="SearchTable">
            <p></p>
            <h4>Search Results </h4>
            <Table striped responsive>
                <thead>
                <tr id={"tablesCool"}>
                    {table.dests}
                </tr>
                </thead>

                <tbody>
                <tr>
                    {table.buttons}
                </tr>

                </tbody>

            </Table>
            <br/>
            <center>{table.count + " Locations Found"}</center>
            <div className="card-body">
                <div className="input-group-prepend">
                    <div onClick={this.addButtonAll.bind(this)}>
                        <Button id={"searchGreen"}>Add All</Button>
                    </div>
                </div>
            </div>

        </div>
    }
}

export default SearchTable;

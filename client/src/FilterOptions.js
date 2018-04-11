import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
class FilterOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cSelected: [],

            query: { // query TFFI
                version: 3,
                type: "query",
                query: "",
                places: [],
                filters:
                    {   "attribute" : "",
                        "values" : []
                    }
            }

        };
        this.makeButtons = this.makeButtons.bind(this);
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        this.saveFilters = this.saveFilters.bind(this);

    }

    onCheckboxBtnClick(selected) {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
            this.state.cSelected.push(selected);
        } else {
            this.state.cSelected.splice(index, 1);
        }
        this.setState({ cSelected: [...this.state.cSelected] });
    }

    makeButtons(){
        let con = this.props.config.filters[0];
        // console.log("con: " + con);
        let but = [];
        for(let i = 0; i < con.values.length; i++){
            // console.log("con.values: " + con.values[i]);
            but.push(<Button color = "success" onClick={()=>this.onCheckboxBtnClick(con.values[i])} active={this.state.cSelected.includes(con.values[i])} >{con.values[i]}</Button>)
        }
        return but;
    }

    saveFilters() {
        let contents = this.state.query;
        contents.filters.attribute = "type";
        contents.filters.values = (this.state.cSelected);

        this.props.updateQuery(contents);
        console.log("contents: " +contents);
        console.log("query " + this.props.query);
    }

    render() {
        //todo need to update the options when a button is pressed
        let buttons = this.makeButtons();
        return (
            <div><ButtonGroup size="sm" vertical>
                {buttons}
            </ButtonGroup>
                <Button className="float-right" onClick={this.saveFilters} type="button">Save</Button>
                {/*&& this.props.toggle()*/}
            </div>
        )
    }
}

export default FilterOptions;



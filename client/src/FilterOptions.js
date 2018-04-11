import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
class FilterOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cSelected: []
        };
        this.makeButtons = this.makeButtons.bind(this);
        this.changeOption = this.changeOption.bind(this);
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
        // this.handleRadius = this.handleRadius.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);

    }

    changeOption(arg) {
        //console.log(arg);
        this.props.updateOptions(arg);
        console.log("this.state.",this.props.options);
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
        let contents = this.props.query;
        contents.filters.attribute = "trip";
        contents.filters.values.push(this.state.cSelected);
        this.props.setState({query: contents});
        console.log("contents: " +contents);
        console.log("query " + this.props.query);
    }
    // handleRadius(event){
    //     this.setState({userRadius: event.target.value});
    //     event.preventDefault();
    // }

    // handleSubmit(event){
    //     this.props.updateUserDef(this.state.userUnit, this.state.userRadius);
    //     alert("Success, radius set to: " + this.state.userRadius);
    //     event.preventDefault();
    // }

    // usercond(){
    //     if(this.props.trip.options.distance === "user defined")
    //         return <form onSubmit={this.handleSubmit}>
    //             <label>
    //                 Name:
    //                 <input type="text" className="form-control" value={this.state.userUnit} onChange={this.handleUnit} />
    //                 Radius:
    //                 <input type = "text" className="form-control" value = {this.state.userRadius} onChange={this.handleRadius}/>
    //             </label>
    //             <input type="submit" value="Submit" />
    //         </form>
    //             ;
    // }

    render() {
        //todo need to update the options when a button is pressed
        let buttons = this.makeButtons();
        return (
            <div><ButtonGroup size="sm" vertical>
                {buttons}
                {/*<Button color = "primary" onClick={()=>this.onRadioBtnClick("user defined")} active={this.props.trip.options.distance === "user defined"}>user defined</Button>*/}
            </ButtonGroup>
                <Button onClick={this.saveFilters} type="button">Save</Button>
                {/*<p>Current Filters: {JSON.stringify(this.state.cSelected)}</p>*/}
                {/*{this.usercond()}*/}
            </div>
        )
    }
}

export default FilterOptions;



import React, {Component} from 'react';

class Dropdown extends Component{
    constructor(props){
        super(props);
        //this.state = {value: ''};
        this.changeStart = this.changeStart.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.createDropElements = this.createDropElements.bind(this);
    }

    changeStart(arg){
        console.log(arg);
        this.props.updateStart(arg);
        //event.preventDefault();
    }

    //Credit for the following two methods' skeletons https://stackoverflow.com/questions/36205673/how-do-i-create-a-dynamic-drop-down-list-with-react-bootstrap
    createDropElements(){
        //console.log(this.props.trip.places.length);
        let element = this.props.trip.places.map((item) => <option key = {item.id} value = {item.id}>{item.name}</option>);
        element.splice(-1,1);
        element.push(<option key = "hey">Select...</option>);
        return element;
    }


    handleChange(event){
        //console.log(event.target.value);
        this.changeStart(event.target.value);
    }

    render(){
        let drop = this.createDropElements();
        return(
            <div id="dropdown" className="card border-0 border-dark">
                <div className="card-header bg-primary text-light">
                    Starting point
                </div>
                <div className="card-body">
                    <form>
                        <label><p>Pick a Starting Point</p>
                            <select onChange ={this.handleChange}>
                                {drop};
                            </select>
                        </label>
                    </form>
                </div>
            </div>
        );
    }
}

export default Dropdown;
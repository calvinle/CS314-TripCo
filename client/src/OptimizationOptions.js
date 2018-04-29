import React, { Component } from 'react';
/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class OptimizationOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.changeOptimizationArg = this.changeOptimizationArg.bind(this);
    }

    changeOptimizationArg(arg){
        //console.log(arg);
        this.props.updateOptimization(arg);
    }

    changeOptimization(event){
        this.changeOptimizationArg(event.target.value);
    }

    render() {
        return (
            <div className="slidecontainer">
                <p>Choose an Optimization level</p>
                <div onChange={this.changeOptimization.bind(this)}>
                <input type="range" min="0" max="1" step={1/this.props.config.optimization} defaultValue={this.props.trip.options.optimization} className="slider" id={"slider"}/>
                </div>
            </div>
        )
    }
}

export default OptimizationOptions;
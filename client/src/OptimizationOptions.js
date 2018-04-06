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
    }

    render() {
        return (
            <div className="slidecontainer">
                <p>Choose an Optimization level</p>
                None &emsp;<input type="range" min="0" max="1" defaultValue={"0"} className="slider" id={"slider"}></input>&emsp; Nearest Neighbor
            </div>
        )
    }
}

export default OptimizationOptions;
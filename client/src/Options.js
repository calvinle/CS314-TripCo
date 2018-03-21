import React, {Component} from 'react';
/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
  constructor(props) {
    super(props);
    this.changeOption = this.changeOption.bind(this);
    this.changeOptimizationArg = this.changeOptimizationArg.bind(this);
  }

  changeOption(arg) {
    //console.log(arg);
    this.props.updateOptions(arg);
  }

  changeButton(event){
      this.changeOption(event.target.id);
  }


  changeOptimizationArg(arg){
      //console.log(arg);
      this.props.updateOptimization(arg);
  }

  changeOptimization(event){
      this.changeOptimizationArg(event.target.value);
  }

  render() {
      //todo need to update the options when a button is pressed
    return(

        <div id="options" className="card border-0 border-dark">
          <div className="card-header bg-primary text-light">
            Options
          </div>
          <div className="card-body">
            <p>Highlight the options you wish to use.</p>
              {/*<div onChange={this.changeButton.bind(this)}>*/}
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <div onChange={this.changeButton.bind(this)}>
              <label className="btn btn-outline-dark">
                <input type="radio" id="miles" name="distance" autoComplete="off"/> Miles
              </label>
              <label className="btn btn-outline-dark">
                <input type="radio" id="kilometers" name="distance" autoComplete="off"/> Kilometers
              </label>
                </div>
            </div>

              <div className="slidecontainer">
                  <p>Choose an Optimization level</p>
                <div onChange={this.changeOptimization.bind(this)}>
                  <input type="range" min="0" max="1" defaultValue={"0"} className="slider" id={"slider"}></input>
                </div>
            </div>
            </div>
          </div>
    )
  }
}

export default Options;

//*************************************************************************
//This portion contains the button style we should use. Saved here for future use if we have time.
{/*<div className="btn-group btn-group-toggle" data-toggle="buttons">*/}
    {/*<label className="btn btn-outline-dark active">*/}
        {/*<input type="radio" id="miles" name="distance" autcomplete="off" defaultChecked/> Miles*/}
    {/*</label>*/}
    {/*<label className="btn btn-outline-dark ">*/}
        {/*<input type="radio" id="kilometers" name="distance" autcomplete="off"/> Kilometers*/}
    {/*</label>*/}
{/*</div>*/}



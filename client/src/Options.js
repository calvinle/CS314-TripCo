import React, {Component} from 'react';
/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
  constructor(props) {
    super(props);
    this.state = {
        userRadius: "",
        userUnit: ""
      };
    this.changeOption = this.changeOption.bind(this);
    this.changeOptimizationArg = this.changeOptimizationArg.bind(this);
    this.userConditional = this.userConditional.bind(this);
    this.handleRadius = this.handleRadius.bind(this);
    this.handleUnit = this.handleUnit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  changeOption(arg) {
    //console.log(arg);
    this.props.updateOptions(arg);
    console.log("this.state.",this.props.options);
  }

  changeButton(event){
      this.changeOption(event.target.id);
      event.preventDefault();
  }

  handleUnit(event){
      this.setState({userUnit: event.target.value});
  }

  handleRadius(event){
      this.setState({userRadius: event.target.value});
      event.preventDefault();
  }

  handleSubmit(event){
      this.props.updateUserDef(this.state.userUnit, this.state.userRadius);
      alert("Success, radius set to: " + this.state.userRadius);
      event.preventDefault();
  }

  userConditional(){
    if(this.props.options.distance ==="user defined")
        return <form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" className="form-control" value={this.state.userUnit} onChange={this.handleUnit} />
                        Radius:
                        <input type = "text" className="form-control" value = {this.state.userRadius} onChange={this.handleRadius}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            ;
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
              <label className="btn btn-outline-dark">
                <input type="radio" id="nautical miles" name="distance" autoComplete="off"/> Nautical Miles
              </label>
              <label className="btn btn-outline-dark">
                  <input type = "radio" id="user defined" name="distance" autoComplete="off"/>User Units
              </label>
                </div>
            </div>
              {this.userConditional()}

              <div className="slidecontainer">
                  <p>Choose an Optimization level</p>
                <div onChange={this.changeOptimization.bind(this)}>
                  None &emsp;<input type="range" min="0" max="1" defaultValue={"0"} className="slider" id={"slider"}></input>&emsp; Nearest Neighbor
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



import React, {Component} from 'react';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div id="header" className="jumbotron" style={{"background-color": "#1E4D2B", "color":"white"}}>
          <img src={"http://www.cs.colostate.edu/~cs314/images/CompSci-NS-CSU-1-Hrev.png"} width={"40%"}/>
          {this.title()}
          <p className="lead">Welcome to Team Gosling's Trip Planner</p>
        </div>
    )
  }

  title() {
    return( <h3>TripCo <small>t{this.props.number} {this.props.name}</small></h3> )
  }
}

export default Header;

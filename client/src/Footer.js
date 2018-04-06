import React, {Component} from 'react';

/* Renders a text footer below the application with copyright
 * and other useful information.
 */
class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div id="footer" className="jumbotron" style={{"background-color": "#1E4D2B", "color":"white"}}>
          {<img src={"http://www.cs.colostate.edu/~cs314/images/CSU-Official-wrdmrk-357-617_Rev.png"}/> }
          <h4 align="middle">Welcome to Team Gosling's Trip Planner  © TripCo {this.props.number} {this.props.name} 2018</h4><br />
        </div>
    )
  }
}

export default Footer;
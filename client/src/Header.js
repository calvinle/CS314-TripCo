import React, {Component} from 'react';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div id="header" className="jumbotron" style={{"background-color": "#1E4D2B", "color":"white", "vertical-align":"middle"}}>
            <img src={"http://www.cs.colostate.edu/~cs314/images/CompSci-NS-CSU-1-Hrev.png"} width={"30%"}/>
        </div>
    )
  }

}

export default Header;

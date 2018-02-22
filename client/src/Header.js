import React, {Component} from 'react';

/* Renders a text heading above the application with useful information.
 */
class Header extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div id="header" className="jumbotron">
          {this.title()}
          <p className="lead">"Want to travel far and wide?"</p>
            <ol >
              <li>
                First seclect if you prefer miles or kilometers for your trip. If you have
                a saved trip or recieved a trip file in tffi format from a friend, please keep in mind that
                the distance unit you in the file will be the units that the trip is displayed in</li>
              <li>
                To plan your trip and see it plotted on a map of Colorado, you must upload either a 
                saved trip file from your last visit, or a trip file in tffi format from elsewhere.</li>
              <li>
                By clicking plan you will be able to see your trip mapped out in straight lines,
                overlayed on the state map of Colorado. Distances from each location of the trip
                will be displayed in the itinerary section, along with a cumulative distance of
                the round trip.
                
                If you wish to save the trip for future use, you can use the save button. This
                will download a file to your computer in the appropriate format.
                
                Don't forget- You must specify a name before you can plan or save your trip! 

                Thanks, and safe travels!</li>
            </ol>
        </div>
    )
  }

  title() {
    return( <h3>TripCo <small>t{this.props.number} {this.props.name}</small></h3> )
  }
}

export default Header;

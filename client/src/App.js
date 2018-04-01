import React, {Component} from 'react';
import Header from './Header';
import Application from './Application';
import Footer from './Footer';

class App extends Component {
  constructor (props){
    super(props);
    this.state = {
      number: "12",
      name: "Dave Matthews' Beard @deprecated"
    }
  }

  render() {
    return(
        <div id="tripco">
            <Header number={this.state.number} name={this.state.name}/>
            <h4 align="middle">Welcome to Team Gosling's Trip Planner  © TripCo t{this.props.number} {this.props.name} 2018</h4><br/>
            <Application />
            <Footer number={this.state.number} name={this.state.name}/>
        </div>
    );
  }
}

export default App;

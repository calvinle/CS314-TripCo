import React, {Component} from 'react';
//import Header from './Header';
import Application from './Application';
//import Footer from './Footer';

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
            {/*<Header number={this.state.number} name={this.state.name}/>*/}
            <Application number={this.state.number} name={this.state.name}/>
            {/*<Footer number={this.state.number} name={this.state.name}/>*/}
        </div>
    );
  }
}

export default App;

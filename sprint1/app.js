class Converter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input1: "",
      input2: "",
      lat1:"", long1:"",
      lat2:"", long2:"",
      output : ""
    };
    this.updateInput1 = this.updateInput1.bind(this);
    this.updateInput2 = this.updateInput2.bind(this);
    this.converter = this.converter.bind(this);
  }
  
  //calvin I think the formula will go here
  converter(event) {
    //Output can be in any form you want, I assume it will be one floating point number representing difference
    //Leave the prevent default or else clicking the equal button will break things
    this.setState({output:[this.lat1,this.long1,this.lat2,this.long2]});
    event.preventDefault();
  }

  updateInput1(event) {
    let place1 = event.target.value;
    this.setState({ input1: place1 });
    let placeOut= this.splitter(place1);
    this.lat1 = placeOut[0];
    this.long1 = placeOut[1];
  }
  updateInput2(event) {
    let place2 = event.target.value;
    this.setState({ input2: place2 });
    let placeOut= this.splitter(place2);
    this.lat2=placeOut[0];
    this.long2=placeOut[1];
  }
  
  splitter(input){
    let inputarr = input.split(/[ °″′]+/g);
    let outarr = [0,0];
    if(inputarr.length ==8){
      if(inputarr[3] == 'N'&&inputarr[7] == 'W'){
        outarr[0] = Number(inputarr[0]) + Number(inputarr[1]/60) + Number(inputarr[2]/3600);
        outarr[1] = -Math.abs(Number(inputarr[4]) + Number(inputarr[5]/60) + Number(inputarr[6]/3600));
      }
      if(inputarr[3] == 'N'&&inputarr[7] == 'E'){
        outarr[0] = Number(inputarr[0]) + Number(inputarr[1]/60) + Number(inputarr[2]/3600);
        outarr[1] = Number(inputarr[4]) + Number(inputarr[5]/60) + Number(inputarr[6]/3600);
      }
      if(inputarr[3] == 'S'&&inputarr[7] == 'W'){
        outarr[0] = -Math.abs(Number(inputarr[0]) + Number(inputarr[1]/60) + Number(inputarr[2]/3600));
        outarr[1] = -Math.abs(Number(inputarr[4]) + Number(inputarr[5]/60) + Number(inputarr[6]/3600));
      }
      if(inputarr[3] == 'S'&&inputarr[7] == 'E'){
        outarr[0] = -Math.abs(Number(inputarr[0]) + Number(inputarr[1]/60) + Number(inputarr[2]/3600));
        outarr[1] = Number(inputarr[4]) + Number(inputarr[5]/60) + Number(inputarr[6]/3600);
      }
    }
    else if(inputarr.length ==6){
      if(inputarr[2] == 'N'&&inputarr[5] == 'W'){
        outarr[0] = Number(inputarr[0]) + Number(inputarr[1]/60);
        outarr[1] = -Math.abs(Number(inputarr[3]) + Number(inputarr[4]/60));
      }
      if(inputarr[2] == 'N'&&inputarr[5] == 'E'){
        outarr[0] = Number(inputarr[0]) + Number(inputarr[1]/60);
        outarr[1] = Number(inputarr[3]) + Number(inputarr[4]/60);
      }
      if(inputarr[2] == 'S'&&inputarr[5] == 'W'){
        outarr[0] = -Math.abs(Number(inputarr[0]) + Number(inputarr[1]/60));
        outarr[1] = -Math.abs(Number(inputarr[3]) + Number(inputarr[4]/60));
      }
      if(inputarr[2] == 'S'&&inputarr[5] == 'E'){
        outarr[0] = -Math.abs(Number(inputarr[0]) + Number(inputarr[1]/60));
        outarr[1] = Number(inputarr[3]) + Number(inputarr[4]/60);
      }
    }
    else if(inputarr.length==4){
      if(inputarr[1] == 'N'&&inputarr[3] == 'W'){
        outarr[0] = Number(inputarr[0]);
        outarr[1] = -Math.abs(Number(inputarr[2]));
      }
      if(inputarr[1] == 'N'&&inputarr[3] == 'E'){
        outarr[0] = Number(inputarr[0]);
        outarr[1] = Number(inputarr[2]);
      }
      if(inputarr[1] == 'S'&&inputarr[3] == 'W'){
        outarr[0] = -Math.abs(Number(inputarr[0]));
        outarr[1] = -Math.abs(Number(inputarr[2]));
      }
      if(inputarr[1] == 'S'&&inputarr[3] == 'E'){
        outarr[0] = -Math.abs(Number(inputarr[0]));
        outarr[1] = Number(inputarr[2]);
      }
    }
    else if(inputarr.length==2){
      outarr[0]=Number(inputarr[0]);
      outarr[1]=Number(inputarr[1]);
    }
    else
      return "Invalid";
    return(outarr);
  }

  render() {
    return (
      <form className="form-inline" onSubmit={this.converter}>
        <input
          type="text"
          className="text-right form-control mr-sm-2"
          value={this.state.input1}
          onChange={this.updateInput1}
        />
        <button
          className="btn btn-primary mr-sm-2"
          type="submit"
          value="submit"
          disabled
        >
          to
        </button>
        <input
          type="text"
          className="text-right form-control mr-sm-2"
          value={this.state.input2}
          onChange={this.updateInput2}
        />
        <button
          className="btn btn-primary mr-sm-2"
          type="submit"
          value="submit"
        >
          =
        </button>
        <input
          type="text"
          className="text-right form-control mr-sm-2"
          value={this.state.output}
        />
      </form>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>Distance Calculator</h1>
        <hr/>
        <Converter />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

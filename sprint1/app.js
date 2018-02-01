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
  
  converter(event) {
    //Leave the prevent default or else clicking the equal button will break things
    //40° 26′ 46″ N 79° 58′ 56″ W
    //42° 32′ 21″ N 76° 37′ 30″ W
    //Sample coordinates for testing
    this.setState({output:this.distanceCalculate()});
    event.preventDefault();
  }
  
  distanceCalculate(){
    let wla1 = this.lat1*(Math.PI / 180); //x1
    let wlo1 = this.long1*(Math.PI / 180); //y1
    let wla2 = this.lat2*(Math.PI / 180);  //x2
    let wlo2 = this.long2*(Math.PI / 180);  //y2
    
    let difY = Math.abs(wlo1 - wlo2);
    
    let top1 = Math.pow(Math.cos(wla2) * Math.sin(difY), 2);
    let top2 = Math.pow( (Math.cos(wla1)*Math.sin(wla2) - Math.sin(wla1)*Math.cos(wla2)*Math.cos(difY)), 2);
    let finalTop = Math.sqrt(top1 + top2);

    let bottom1 = Math.sin(wla1)*Math.sin(wla2);
    let bottom2 = Math.cos(wla1)*Math.cos(wla2)*Math.cos(difY);
    let finalBottom = bottom1 + bottom2;

    let final = Math.atan2(finalTop, finalBottom);
    let dd = Number(final * 6371.0088).toFixed(2);

    return dd;
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
      return "Invalid Input Form";
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
          className="btn btn-default mr-sm-2"
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
      <div className="container">
        <div className="jumbotron">
          <h1>Distance Calculator</h1>
          <hr/>
          <Converter />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));

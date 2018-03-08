import React, {Component} from 'react';

class Itinerary extends Component {
  constructor(props) {
    super(props);

    this.createTable = this.createTable.bind(this);
  }

  sumDists(){
      let sumD = this.props.trip.distances;
      let count = 0;
      var sum = 0;
      var tot = [];
      sumD.forEach(function(obj){
          sum += obj;
          tot[count] = sum;
          console.log(tot[count]);
          count+=1;
      });
      //console.log("here:", sum);
      return {sum, tot};
  }

  createTable () {
    let distance = this.sumDists().sum;// need to sum this from real the trip
    let roundTrip = this.sumDists().tot.map((item) => <td>{item}</td>);
    let units = this.props.trip.options.distance;
    let dests = this.props.trip.places.map((item) => <td>{item.name}</td>);
    let dists = this.props.trip.distances.map((item) => <td>{item}</td>);
    //let tableCells = numbers.map((number, index) => <td key={index}>{number}</td>);

    console.log(this.props.trip);

    return {distance, units, dests, dists, roundTrip};
  }

  render() {
    let table = this.createTable();


    return(
        <div id="itinerary">
          <h4>Round trip distance of {table.distance} {table.units}. </h4>
          <table className="table table-responsive table-bordered">
            <thead>
            <tr className="table-primary">
              <th className="align-middle">Destination</th>
              {table.dests}
            </tr>
            </thead>
            <tbody>
            <tr>
              <th className="table-danger align-middle">{table.units}</th>
              {table.dists}
            </tr>
            <tr>
                <th className="table-success align-middle">cumulative distance</th>
                {table.roundTrip}
            </tr>
            </tbody>
          </table>
        </div>
    )
  }
}

export default Itinerary;

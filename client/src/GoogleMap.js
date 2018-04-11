import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class GoogleMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            center: { lat: 40.5853, lng: -105.0844 },
            zoom: 13,
            path: []
        };
        this.draw = this.draw.bind(this);
        this.assign = this.assign.bind(this);
        this.delimit = this.delimit.bind(this);
        this.conditional = this.conditional.bind(this);
    }

    //Help on this method received from https://github.com/Dooffy/google-map-react-polyline-example/blob/master/examples/basic/src/components/Map.js

    delimit(string){
        let arr = string.split(/['\" °″′]+/);
        //console.log("delimit: ",arr);
        if(arr[1] === 'S'|| arr[1] === 'W')
            return -1*parseFloat(arr[0]);
        else return parseFloat(arr[0]);
    }

    fitBounds (map, maps) {
        var bounds = new maps.LatLngBounds()
        for (let marker of this.state.path) {
            bounds.extend(
                new maps.LatLng(marker.lat, marker.lng)
            )
        }
        map.fitBounds(bounds)
    }

    draw(){
        let temp = this.props.trip.places;
        for(let i = 0; i < temp.length; i++){
            this.state.path.push({lat: this.delimit(temp[i].latitude), lng: this.delimit(temp[i].longitude)})
        }
        console.log("temp",this.state.path);
    }

    assign(map,maps){
            this.draw()
            let flightPath = new maps.Polyline({
                path: this.state.path,
                geodesic: false,
                strokeColor: '#0000ff',
                strokeOpacity: 1.0,
                strokeWeight: 4
            });
            flightPath.setMap(map);
            this.fitBounds(map,maps);
    }

    conditional(){
        if(this.props.trip.places.length > 0){
            console.log("places!");
            return  <div className='google-map' style={{ height: '100vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyDtufOVmTIpFwbu0yUhgXwUNUfbmIK0udo' }}
                            defaultCenter={this.state.center}
                            defaultZoom={this.state.zoom}
                            onGoogleApiLoaded={({map,maps})=>this.assign(map,maps)}
                            yesIWantToUseGoogleMapApiInternals={true}>
                        </GoogleMapReact>
                    </div>
        }
    }

    render() {
        return (
            <div>
                {this.conditional()}
            </div>
        )
    }
}

export default GoogleMap;
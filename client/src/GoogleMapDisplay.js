import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Marker } from 'react-google-maps';

class InnerMap extends Component {
    constructor(props) {
        super(props);
        this.makePath = this.makePath.bind(this);
        this.makeMarkers = this.makeMarkers.bind(this);
        this.mapRender = this.mapRender.bind(this);
        this.delimit = this.delimit.bind(this);
    }

    delimit(string) {
        let arr = string.split(/['\" °″′]+/);
        //console.log("delimit: ",arr);
        if (arr[1] === 'S' || arr[1] === 'W')
            return -1 * parseFloat(arr[0]);
        else return parseFloat(arr[0]);
    }

    makePath(places) {
        let path = places.map(
            x => ({ lat: this.delimit(x.latitude), lng: this.delimit(x.longitude) })
        );
        path.push({ lat: this.delimit(places[0].latitude), lng: this.delimit(places[0].longitude) });
        return path;
    }

    makeMarkers(places) {
        let markers = places.map(
            x => <Marker position={{ lat: this.delimit(x.latitude), lng: this.delimit(x.longitude) }} />
        );
        return markers;
    }

    componentDidMount() {
        this.mapRender();
    }

    componentWillRecieveProps(nextProps) {
        if (JSON.stringify(this.props.trip.places) !== JSON.stringify(nextProps.trip.places)) {
            this.mapRender();
        }
    }

    mapRender() {
        if (this.props.trip.places.length > 0) {
            return (
                <GoogleMap
                    defaultCenter={{ lat: 40.5853, lng: -105.0844 }}
                    defaultZoom={4}
                >
                    <Polyline path={this.makePath(this.props.trip.places)}
                        options={{ strokeColor: 'DeepSkyBlue' }}
                    />
                    {/*{this.makeMarkers(this.props.trip.places)}*/}
                </GoogleMap>
            );
        } else {
            return (
                <GoogleMap
                    defaultCenter={{ lat: 40.5853, lng: -105.0844 }}
                    defaultZoom={4}
                >
                </GoogleMap>
            );
        }
    }

    render() {
        return (
            <div>
                {this.mapRender()}
            </div>
        );
    }
}

const GoogleMapDisplay = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?' +
            'key=AIzaSyDtufOVmTIpFwbu0yUhgXwUNUfbmIK0udo' +
            '&v=3.exp' +
            '&libraries=geometry,drawing,places',
        loadingElement: <div />,
        containerElement: <div />,
        mapElement: <div style={{ height: '100%' }} />,
    }),
    withScriptjs,
    withGoogleMap,
)(InnerMap);

export default GoogleMapDisplay;
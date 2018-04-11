import React from 'react';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

//Example taken from https://github.com/tomchentw/react-google-maps/issues/636 courtesy of VinceBT
const GoogleMapsWrapper = withScriptjs(withGoogleMap(props => {
    const { onMapMounted, ...otherProps } = props;
    return <GoogleMap {...otherProps} ref={c => {
        onMapMounted && onMapMounted(c)
    }}>{props.children}</GoogleMap>
}));

class DisplayMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: [],
        }
    }

    render() {
        return (
            <GoogleMapsWrapper
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDtufOVmTIpFwbu0yUhgXwUNUfbmIK0udo&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                defaultZoom={3}
                defaultCenter={{ lat: 25.0391667, lng: 121.525 }}
                onMapMounted={this._handleMapMounted}
                onBoundsChanged={this._handleBoundsChanged}>
                <MarkerClusterer
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}>
                    {this.state.markers.map(marker => (
                        <Marker
                            key={marker.photo_id}
                            position={{ lat: marker.latitude, lng: marker.longitude }}
                        />
                    ))}
                </MarkerClusterer>
            </GoogleMapsWrapper>
        )
    }
}

export default DisplayMap;
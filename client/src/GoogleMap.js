import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';


class GoogleMap extends Component {
    constructor(props){
        super(props);
        this.state = {
            center: { lat: 40.5853, lng: -105.0844 },
            zoom: 13
        }
    }

    render() {
        return (
            <div className='google-map' style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyDtufOVmTIpFwbu0yUhgXwUNUfbmIK0udo' }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}>
        </GoogleMapReact>
            </div>
        )
    }
}

export default GoogleMap;
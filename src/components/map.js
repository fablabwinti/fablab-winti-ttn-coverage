import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

const SimpleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={{ lat: 47.500070, lng: 8.724097 }}
  >
    {/*props.markers.map((marker, index) => (
      <Marker
        {...marker}
        onRightClick={() => props.onMarkerRightClick(index)}
      />
    ))*/}
  </GoogleMap>
));

export class Map extends Component {

  render() {
    return (
      <SimpleMap
        containerElement={
          <div style={{ height: 600 }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
      />
    );
  }
}

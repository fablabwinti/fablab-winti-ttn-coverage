import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

var gpsMarker = require('../theme/images/gps-marker.png');

const SimpleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={{ lat: 47.500070, lng: 8.724097 }}
  >
    {props.gpsLogs.filter(gpsLog => gpsLog.location.latitude !== 0).map((gpsLog, index) => (
      <Marker
        key={gpsLog._id}
        icon={gpsMarker}
        position={{lat: gpsLog.location.latitude, lng: gpsLog.location.longitude}}
        onClick={() => props.onMarkerClick(index)}
      />
    ))}
  </GoogleMap>
));

export class Map extends Component {

  handleOnMarkerClicked(e) {
    if(this.props.onGpsLogMarkerClick) {
      this.props.onGpsLogMarkerClick(this.props.gpsLogs[e]);
    }
  }

  render() {
    return (
      <SimpleMap
        containerElement={ <div style={{ height: `100%` }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }
        onMarkerClick={this.handleOnMarkerClicked.bind(this)}
        gpsLogs={this.props.gpsLogs}
      />
    );
  }  
}

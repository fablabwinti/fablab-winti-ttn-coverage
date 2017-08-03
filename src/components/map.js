import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker, Polyline } from 'react-google-maps'
import mapStyles from "../theme/map/map2.json";

var gpsMarker = require('../theme/images/gps-marker.png');

function getPixelPositionOffset(width, height) {
  return { x: -(width / 2), y: -(height / 2) };
}

const SimpleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={13}
    defaultCenter={{ lat: 47.500070, lng: 8.724097 }}
    defaultOptions={{ styles: mapStyles }}
  >
    {props.gpsLogs.filter(gpsLog => gpsLog.location.latitude !== 0).map((gpsLog, index) => (
      <Marker
        key={gpsLog._id}
        icon={gpsMarker}
        position={{lat: gpsLog.location.latitude, lng: gpsLog.location.longitude}}
        onClick={() => props.onMarkerClick(index)}
      />
    ))}

    {props.gwLines.length > 0 &&
      <Polyline
        path={props.gwLines}
        options={{strokeColor: '#33aa66', strokeOpacity:0.75, strokeWeight:2, geodesic:true }}
      />
    }

  </GoogleMap>
));

export class Map extends Component {

  gwLines = []

  handleOnMarkerClicked(e) {
    //this._showOverlay =!this._showOverlay
    
    this.gwLines = []
    this.gwLines.push({lat: this.props.gpsLogs[e].latitude, lng: this.props.gpsLogs[e].longitude})
    this.gwLines.push({lat: 47.500070, lng: 8.724097})

    //alert(1)
    /*
    if(this.props.onGpsLogMarkerClick) {
      this.props.onGpsLogMarkerClick(this.props.gpsLogs[e]);
    }
    */
  }

  render() {
    
    this.gwLines = []
    this.gwLines.push({lat: 47.490070, lng: 8.714097})
    this.gwLines.push({lat: 47.500070, lng: 8.724097})

    return (
      <SimpleMap
        containerElement={ <div style={{ height: `100%` }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }
        onMarkerClick={this.handleOnMarkerClicked.bind(this)}
        gpsLogs={this.props.gpsLogs}
        overlayPosition={{ lat: 47.500070, lng: 8.724097 }}
        gwLines={this.gwLines}
        showOverlay={this._showOverlay}
      />
    );
  }  
}

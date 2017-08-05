import React, { Component } from 'react'
import { withGoogleMap, GoogleMap, Marker, Polyline, OverlayView } from 'react-google-maps'

import mapStyles from "../theme/map/map2.json";

var gpsMarker = require('../theme/images/gps-marker.png');
var deadspotMarker = require('../theme/images/deadspot-marker.png');

const SimpleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    defaultZoom={14}
    defaultCenter={{ lat: 47.500070, lng: 8.724097 }}
    defaultOptions={{ styles: mapStyles }}
    onClick={props.onMapClick}
  >
    {props.gpsLogs.map((gpsLog, index) => (
      <Marker
        key={gpsLog._id}
        icon={gpsMarker}
        position={{lat: gpsLog.location.latitude, lng: gpsLog.location.longitude}}
        onClick={() => props.onMarkerClick(index)}
      />
    ))}
    
    {props.deadSpots.map((deadSpot, index) => (
      <Marker
        key={deadSpot._id}
        icon={deadspotMarker}
        position={{lat: deadSpot.location.latitude, lng: deadSpot.location.longitude}}
      />
    ))}

    {props.logDetails.gateways.map((gw, index) => (
      <Polyline
        path={[
          {lat: props.logDetails.location.latitude, lng: props.logDetails.location.longitude},
          {lat: gw.latitude, lng: gw.longitude}]}
        options={{strokeColor: '#66ffbb', strokeOpacity:0.75, strokeWeight:2, geodesic:true }}
      />
    ))}

    
    {props.logDetails.gateways.map((gw, index) => (
     <OverlayView
      position={{ lat: gw.latitude, lng: gw.longitude }}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
    >
      <div style={{backgroundColor: 'rgba(220, 225, 230, 0.75)', color: '#000000', padding: 10, fontFamily: 'monospace'}}>
        <span>{gw.gtw_id}<br/>rssi: {gw.rssi}, snr: {gw.snr}</span>
      </div>
    </OverlayView>

    ))}


  </GoogleMap>
));

export class Map extends Component {

  handleOnMarkerClicked(e) {
    if(this.props.onGpsLogMarkerClick) {
      this.props.onGpsLogMarkerClick(this.props.gpsLogs[e])
    }
  }
  
  handleOnMapClicked(e) {
    if(this.props.onMapClick) {
      this.props.onMapClick()
    }
  }

  render() {
    
    return (
      <SimpleMap
        containerElement={ <div style={{ height: `100%` }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }
        onMarkerClick={this.handleOnMarkerClicked.bind(this)}
        onMapClick={this.handleOnMapClicked.bind(this)}
        gpsLogs={this.props.gpsLogs}
        overlayPosition={{ lat: 47.500070, lng: 8.724097 }}
        logDetails={this.props.gpsLogDetails.details}
        deadSpots={this.props.deadSpots}
        showOverlay={this._showOverlay}
      />
    );
  }  
}

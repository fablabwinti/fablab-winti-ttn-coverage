
import React, { Component } from 'react'
import { bindActionContainers } from 'redux'
import { connect } from 'react-redux'
import { Map } from './map'

class HomeComponent extends Component {

  handleOnGpsLogMarkerClick(e) {
    alert(e.deviceId);
  }

  render() {
    return (
      <div className="map-container">
        <Map gpsLogs={this.props.gpsLogs} onGpsLogMarkerClick={this.handleOnGpsLogMarkerClick.bind(this)} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gpsLogs: state.gpsLogs
  }
}

export const Home = connect(mapStateToProps)(HomeComponent);

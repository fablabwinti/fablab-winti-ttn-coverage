
import React, { Component } from 'react'
import { bindActionContainers } from 'redux'
import { connect } from 'react-redux'
import { Map } from './map'
import { loadGpsLogDetails, clearGpsLogDetails } from '../actions'

class HomeComponent extends Component {

  handleOnGpsLogMarkerClick(logItem) {
    //alert(e._id)
    console.log(this.props)
    this.props.dispatch(loadGpsLogDetails(logItem))
  }

  handleOnMapClicked() {
    this.props.dispatch(clearGpsLogDetails())
  }

  render() {
    return (
      <div className="map-container">
        <Map gpsLogs={this.props.gpsLogs}  
          gpsLogDetails={this.props.gpsLogDetails} 
          onGpsLogMarkerClick={this.handleOnGpsLogMarkerClick.bind(this)}
          onMapClick={this.handleOnMapClicked.bind(this)}
        />
        <div className="gps-log-details">
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    gpsLogs: state.gpsLogs,
    gpsLogDetails: state.gpsLogDetails
  }
}

export const Home = connect(mapStateToProps)(HomeComponent);

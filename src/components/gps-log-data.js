import React, { Component } from 'react'
import fabLabLogo from '../theme/images/fablab-winti-logo-sm.png'

export class GpsLogData extends Component {
  render() {
    return (
      <div className="container-fluid">
        <table className="table table-sm table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
          {this.props.gpsLogs.filter(gpsLog => gpsLog.location.latitude !== 0).map((gpsLog, index) => (
            <tr>
              <th scope="row">{gpsLog._id}</th>
              <td>{gpsLog.location.latitude}</td>
              <td>{gpsLog.location.longitude}</td>
              <td>{gpsLog.location.altitude}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    );
  }
}

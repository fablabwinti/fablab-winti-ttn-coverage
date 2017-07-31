import React from 'react'
import { bindActionContainers } from 'redux';
import { connect } from 'react-redux'

class GpsLogsTable extends React.Component {


  createTableRows() {
/*  "Id": 66,
        "GpsTrackerId": 11,
        "LogType": 1,
        "LogTime": "2017-07-18T19:40:57.363Z",
        "Longitude": 8.733811378479004,
        "Latitude": 47.489810943603516,
        "Altitude": 444,
        "FrameCount": 4,
        "Frequency": 868.1,
        "Modulation": "LORA",
        "DataRate": "SF7BW125",
        "CodingRate": "4/5",
        "TTNDeviceId": "gps-tracker-001"
   */
    return this.props.gpsLogs.map((log) => {
      return (<tr key={ log.Id }>
        <td>{ log.LogTime }</td>
        <td>{ log.TTNDeviceId }</td>
        <td>{ log.Latitude }, { log.Longitude }</td>
        <td>{ log.Frequency }</td>
        <td>{ log.Modulation }</td>
        <td>{ log.DataRate }</td>
        <td>{ log.CodingRate }</td>
      </tr>)
    })

  }

  render() {


    return ( 
      <table className="table table-striped">
        <thead>
          <tr>
            <th>time</th>
            <th>gps tracker</th>
            <th>Coordinates</th>
            <th>Freq.</th>
            <th>Mod</th>
            <th>Data Rate</th>
            <th>Coding Rate</th>
          </tr>
        </thead>
        <tbody>
          {this.createTableRows()}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps(state) {
  return {
    gpsLogs: state.gpsLogs
  }
}

export default connect(mapStateToProps)(GpsLogsTable);

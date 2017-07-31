import React from 'react'
import GpsLogsTable from './gps-logs-table'

class GpsLogsPage extends React.Component {

  render() {
    return ( 
      <div className="container">
        <h1>GPS Log Data</h1>
        <GpsLogsTable />
      </div>
    )
  }
}

export default GpsLogsPage;

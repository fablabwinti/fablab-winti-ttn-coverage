import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import AppHeader from './layout/app-header'
import AppFooter from './layout/app-footer'

import GpsLogsPage from './gps-logs/gps-logs-page'

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <AppHeader/>
          <Route to="/" exact component={GpsLogsPage} />
          <AppFooter/>
        </div>
      </Router>
    )
  }
}

export default App

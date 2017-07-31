import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { NavLink } from 'react-router-dom'

import fabLabLogo from '../../images/fablab-winti-logo-sm.png'
import './app-header.scss'

export default class AppHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md fixed-top navbar-inverse bg-primary">
        <div className="container">
          

          <button className="navbar-toggler navbar-toggler-right" aria-expanded="false" aria-controls="navbarColor01" aria-label="Toggle navigation" type="button" data-toggle="collapse" data-target="#navbarColor01">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <img src={fabLabLogo} className="fablab-logo" />

          <a className="navbar-brand" href="#">TTN coverage</a>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact activeClassName="active">Map</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/gateways" activeClassName="active">Gateways</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/gps-trackers" activeClassName="active">GPS Trackers</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/gps-log" activeClassName="active">GPS Log</NavLink>
              </li>
            </ul>



          </div>
          
        </div>
      </nav>
    )
  }
}

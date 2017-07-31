import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import './app-footer.scss'

export default class AppFooter extends Component {
  render() {
    return (
      <div className="container app-footer">

        <ul className="list-unstyled">
          <li><a href="http://fablabwinti.ch" target="_blank">FabLab Winterthur</a></li>
          <li><a href="http://thethingsnetwork.org" target="_blank">The Things Network</a></li>
          <li><a href="http://github.com/fablabwinti" target="_blank">Git Hub</a></li>
        </ul>

      </div>
    )
  }
}

import React, { Component } from 'react';

import fabLabLogo from '../theme/images/fablab-winti-logo-sm.png'

export class AppHeader extends Component {
  render() {
    return (
      <header className="app-header">
        <nav className="navbar navbar-toggleable-md fixed-top navbar-inverse bg-primary">
          <a className="navbar-brand" href="/">
            <img src={fabLabLogo} className="fablab-logo" />
            <span>FabLab Winti - TTN coverage</span>
          </a>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="http://fablabwinti.ch" target="_blank">FabLab Winterthur</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="http://thethingsnetwork.org" target="_blank">The Things Network</a>
              </li>
              {/*
              <li className="nav-item">
                <a className="nav-link" href="http://github.com/fablabwinti" target="_blank">Git Hub</a>
              </li>
              */}
            </ul>
          </div>

        </nav>
      </header>
    );
  }
}

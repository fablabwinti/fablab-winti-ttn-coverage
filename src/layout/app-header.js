import React, { Component } from 'react';

import fabLabLogo from '../theme/images/fablab-winti-logo-sm.png'

export class AppHeader extends Component {
  render() {
    return (
      <header className="app-header">
        <nav className="navbar navbar-toggleable-md fixed-top navbar-inverse bg-primary">
          
          <img src={fabLabLogo} className="fablab-logo" />

          <a className="navbar-brand" href="#">TTN coverage</a>

        </nav>
      </header>
    );
  }
}

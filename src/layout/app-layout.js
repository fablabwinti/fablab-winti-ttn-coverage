import React, { Component } from 'react';

import { AppHeader } from './app-header';
import { AppFooter } from './app-footer';

export class AppLayout extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <div className="app-content">
        {this.props.children}
        </div>
        <AppFooter />
      </div>
    );
  }
}

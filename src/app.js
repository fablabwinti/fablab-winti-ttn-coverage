import React, { Component } from 'react'
import { AppLayout } from './layout/app-layout'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './components/home'

export class App extends Component {
  render() {
    return (
      <Router>
        <AppLayout>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
        </AppLayout>
      </Router>
    );
  }
}

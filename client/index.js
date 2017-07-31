import React from 'react'
import { render } from 'react-dom'
import App from './components/app'
import { Provider } from 'react-redux'
import { loadGpsLogs } from './actions'

import './scss/styles.scss'

import store from './reducers'
store.dispatch(loadGpsLogs());

render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('app'))
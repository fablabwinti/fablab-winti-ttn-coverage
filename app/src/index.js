import React from 'react'
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { App } from './app'
import './theme/styles.css'
import { loadGpsLogs, loadDeadSpots } from './actions'

import store from './reducers'
store.dispatch(loadGpsLogs());
store.dispatch(loadDeadSpots());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'

import gpsLogsReducer from './reducer-gpslog'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk, promise()),
  // other store enhancers if any
);

export default createStore(
  combineReducers({
    gpsLogs: gpsLogsReducer
  }), 
  {}, 
  enhancer
)
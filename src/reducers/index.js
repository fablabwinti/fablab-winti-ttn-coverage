import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'gps-logs-reducer'
import gpsLogsReducer from './reducer-gpslog'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, promise()),
);

export default createStore(
  combineReducers({
    gpsLogs: gpsLogsReducer
  }), 
  {}, 
  enhancer
)
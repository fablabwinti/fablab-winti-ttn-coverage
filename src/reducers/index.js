import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import gpsLogsReducer from './gps-logs-reducer'

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
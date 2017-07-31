
export default (state = [], action) => {
  switch(action.type) {
    case 'LOAD_GPS_LOGS_FULFILLED':
      return action.payload;

    case 'WS_GPS_LOG_ADDED':
      return Object.assign({}, state)

    default:
      return state;
  }
}

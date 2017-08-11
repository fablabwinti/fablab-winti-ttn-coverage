let initalState = {
  showDetails: false, 
  details: {
    gateways: []
  }
}
export default (state = initalState, action) => {

  switch(action.type) {
    case 'LOAD_GPS_LOG_DETAILS_PENDING':
      return Object.assign({}, initalState)

    case 'LOAD_GPS_LOG_DETAILS_FULFILLED':
      return {showDetails: true, details: action.payload}
      

    case 'CLEAR_GPS_LOG_DETAILS_FULFILLED':
      return Object.assign({}, initalState)

    default:
      return state;
  }
}

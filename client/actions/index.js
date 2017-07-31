export const loadGpsLogs = () => {
  console.log('create loadGpsLogs action')
  return {
    type: 'LOAD_GPS_LOGS',
    payload: new Promise((resolve, reject) => {
      console.log('fetch /api/gps-logs')
      fetch('/api/gps-logs')
        .then(response => {
          resolve(response.json()) 
        })
        .catch(error => {
          reject(error);
        });
    })
  }
}

export const gpsLogAdded = (log) => {
  return {
    type: 'WS_GPS_LOG_ADDED',
    payload: log
  }
}

/*
export const loadGateways = () => {
  return {
    type: 'LOAD_GATEWAYS'
  }
}
export const loadGpsTrackers = () => {
  return {
    type: 'LOAD_GPS_TRACKERS'
  }
}
export const addGateway = () => {
  return {
    type: 'WS_GATEWAY_ADDED'
  }
}
export const addGpsTracker = () => {
  return {
    type: 'WS_GPS_TRACKER_ADDED'
  }
}
*/
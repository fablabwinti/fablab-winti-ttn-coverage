export const loadGpsLogs = () => {
  return {
    type: 'LOAD_GPS_LOGS',
    payload: new Promise((resolve, reject) => {
      fetch('/api/gps-logs')
        .then(response => {
          resolve(response.json())
        })
        .catch(error => {
          reject(error);
        })
    })
  }
}

export const gpsLogAdded = (log) => {

  return {

    type: 'WS_GPS_LOG_ADDED',

    payload: log

  }

}
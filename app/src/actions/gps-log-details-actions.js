export const loadGpsLogDetails = (gpsLog) => {
  return {
    type: 'LOAD_GPS_LOG_DETAILS',
    payload: new Promise((resolve, reject) => {
      fetch('/api/gps-logs/' + gpsLog._id)
        .then(response => {
          resolve(response.json())
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}
export const clearGpsLogDetails = () => {
  return {
    type: 'CLEAR_GPS_LOG_DETAILS',
    payload: new Promise((resolve, reject) => {
      resolve({showDetails: false, lines:[]})
    })
  }
}

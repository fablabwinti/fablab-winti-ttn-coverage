export const loadDeadSpots = () => {
  return {
    type: 'LOAD_DEAD_SPOTS',
    payload: new Promise((resolve, reject) => {
      fetch('/api/dead-spots')
        .then(response => {
          resolve(response.json())
        })
        .catch(error => {
          reject(error);
        })
    })
  }
}

export const deadSpotsAdded = (log) => {
  return {
    type: 'WS_DEAD_SPOTS_ADDED',
    payload: log
  }
}

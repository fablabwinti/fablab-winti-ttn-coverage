const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbConfig = require('./config').dbConfig;
const ttnConfig = require('./config').ttnConfig;

const port = process.env.PORT || 3001

const url = 'mongodb://' + dbConfig.user + ':' + dbConfig.password + '@' + dbConfig.server + ':' + dbConfig.port + '/' + dbConfig.database + '?replicaSet=eusbg1'
const db = require('monk')(url)
const gpsLogs = db.get('gps-logs')
const deadSpots = db.get('deadspots')

app.use(express.static('build'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

function toFloat(b_data) {
  var buf = new ArrayBuffer(4)
  var view = new DataView(buf)
  b_data.forEach(function (b, i) {
    view.setUint8(i, b)
  });
  return view.getFloat32(0)
}

function toInt16(b_data) {
  var buf = new ArrayBuffer(2)
  var view = new DataView(buf)
  view.setUint8(0, b_data[1])
  view.setUint8(1, b_data[0])
  return view.getInt16(0)
}

let ttnRouter = express.Router()

ttnRouter.route('/gps-logs').get(function(req, res) {
  gpsLogs.find({},{'deviceId': 1, 'time': 1, 'location': 1}).then((docs) => {
    res.json(docs)
  })
})

/*
ttnRouter.route('/gps-logs-full').get(function(req, res) {
  gpsLogs.find().then((docs) => {
    res.json(docs)
  })
})
ttnRouter.route('/gps-cleanup').get(function(req, res) {
  gpsLogs.remove({'location.latitude': 0, 'location.longitude': 0}).then((d) => {
    res.json({ status: OK})
  })
})
*/

ttnRouter.route('/gps-logs/:id').get(function(req, res) {
  gpsLogs.findOne({_id: req.params.id}).then((docs) => {
    res.json(docs)
  })
})


ttnRouter.route('/dead-spots').get(function(req, res) {
  deadSpots.find().then((docs) => {
    res.json(docs)
  })
})

ttnRouter.route('/ttn-message').post(function(req, res) {

  if(req.headers.authorization !== ttnConfig.authorization) {
    res.sendStatus(404)
    return
  }

  let msg = req.body

  let rawData = Buffer.from(msg.payload_raw, 'base64')
  let msgType = rawData[0]

  switch(msgType) {
    case 1: {
      console.log('msg type 1', msg.payload_raw)
      
      let lat = toFloat(rawData.slice(1, 5))
      let lon = toFloat(rawData.slice(5, 9))
      let alt = toInt16(rawData.slice(9, 11))

      let gpsLogData = {
        deviceId: msg.dev_id,
        time: msg.metadata.time,
        frequency: msg.metadata.frequency,
        modulation: msg.metadata.modulation,
        data_rate: msg.metadata.data_rate,
        bit_rate: msg.metadata.bit_rate,
        coding_rate: msg.metadata.coding_rate,
        location: {
          longitude: lon,
          latitude: lat,
          altitude: alt
        },
        gateways: msg.metadata.gateways
      }
      
      gpsLogs.insert(gpsLogData).then(function(data) {
        res.json({ message: 'OK' })
      }).catch(err => {
        console.error(err)
        res.sendStatus("500")
        return;
      })
      
      break
    }

    case 10: {
      console.log('msg type 10', msg.payload_raw)
      let msgLength = rawData[1];
      for(let i = 0; i < msgLength; i++) {
        
        let msgOffset = i * 8;

        let lat = toFloat(rawData.slice(2 + msgOffset, 6 + msgOffset))
        let lon = toFloat(rawData.slice(6 + msgOffset, 10 + msgOffset))

        gpsLogs.findOne({'location.latitude': lat, 'location.longitude': lon}).then((docs) => {
          if(!docs) {
            let deadSpotData = {
              deviceId: msg.dev_id,
              time: msg.metadata.time,
              location: {
                longitude: lon,
                latitude: lat
              }
            }
            
            deadSpots.insert(deadSpotData).then(function(data) {
              console.log('dead spot added')
            }).catch(err => {
              console.error(err)
            })
            
          }
        })
      }

      res.sendStatus(200)
      break
    }

    case 80: {
      console.log('ping from ' + msg.dev_id)
      res.sendStatus(200)
      break
    }
  }

})

app.use('/api', ttnRouter);

app.listen(port, function () {
  console.log('app listening on port ' + port)
})

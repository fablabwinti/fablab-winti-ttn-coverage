const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const dbConfig = require('./config').dbConfig;

console.log('-----------------------------------------')
console.log(dbConfig)

const port = process.env.PORT || 3001

const url = 'mongodb://' + dbConfig.user + ':' + dbConfig.password + '@' + dbConfig.server + ':' + dbConfig.port + '/' + dbConfig.database + '?replicaSet=eusbg1'
const db = require('monk')(url)
const gpsLogs = db.get('gps-logs')

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
  gpsLogs.find({},{'location':1}).then((docs) => {
    res.json(docs)
  })
})

ttnRouter.route('/gps-logs/:id').get(function(req, res) {
  gpsLogs.findOne({_id: req.params.id}).then((docs) => {
    res.json(docs)
  })
})

ttnRouter.route('/ttn-message').post(function(req, res) {

  if(req.headers.authorization !== 'd5228417c6b840d929265970ba1753b5ed3eaed45a2cc3794a568ae5f5c8b6fd4cf1') {
    res.sendStatus(404)
    return
  }

  let msg = req.body;
  let rawData = Buffer.from(msg.payload_raw, 'base64');
  let msgType = rawData[0];
  let lat = toFloat(rawData.slice(1, 5));
  let lon = toFloat(rawData.slice(5, 9));
  let alt = toInt16(rawData.slice(9, 11));

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
  };

  gpsLogs.insert(gpsLogData).then(function(data) {
    res.json({ message: 'OK' })
  }).catch(err => {
    console.error(err)
    res.sendStatus("500")
  })

})

app.use('/api', ttnRouter);

app.listen(port, function () {
  console.log('app listening on port ' + port)
})

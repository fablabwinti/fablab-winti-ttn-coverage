import sql from 'mssql';
import { dbConnection as config } from '../config'

const pool = new sql.ConnectionPool(config);

pool.connect().then( p => {
  console.log('connected to ' + config.database);
}).catch(err => {
  console.error('error! no connection to database', err);
});


function toFloat(b_data) {
  var buf = new ArrayBuffer(4);
  var view = new DataView(buf);
  b_data.forEach(function (b, i) {
    view.setUint8(i, b);
  });
  return view.getFloat32(0);
}

function toInt16(b_data) {
  var buf = new ArrayBuffer(2);
  var view = new DataView(buf);
  view.setUint8(0, b_data[1]);
  view.setUint8(1, b_data[0]);
  return view.getInt16(0);
}


const addTtnMessage = async (msg) => {

  console.log('--- addTtnMessage ---');
  console.log(msg);

  
  let rawData = Buffer.from(msg.payload_raw, 'base64');
  let msgType = rawData[0];
  let lat = toFloat(rawData.slice(1, 5));
  let lon = toFloat(rawData.slice(5, 9));
  let alt = toInt16(rawData.slice(9, 11));

  if(msgType === 1 && msg.metadata) {

    let gpsLogId = 0;

    try {
      let addTtnMessageResult = await pool.request()
        .input('TTNDeviceId', sql.VarChar, msg.dev_id)
        .input('LogType', sql.Int, 1)
        .input('LogTime', sql.DateTime, new Date(msg.metadata.time))
        .input('Latitude', sql.Float, lat)
        .input('Longitude', sql.Float, lon)
        .input('Altitude', sql.Float, alt)
        .input('FrameCount', sql.Int, msg.counter)
        .input('Frequency', sql.Float, msg.metadata.frequency)
        .input('Modulation', sql.VarChar, msg.metadata.modulation)
        .input('DataRate', sql.VarChar, msg.metadata.data_rate)
        .input('CodingRate', sql.VarChar, msg.metadata.coding_rate)
        .execute('dbo.addTtnLogMessage');

      gpsLogId = addTtnMessageResult.returnValue;
    }
    catch(err) {
      console.error(err);
      throw err
    }

    if(msg.metadata.gateways) {
      msg.metadata.gateways.forEach(async (gateway) => {

        let addTtnGwMessageResult = await pool.request()
          .input('GpsLogId', sql.Int, gpsLogId)
          .input('TTNGatewayId', sql.VarChar, gateway.gtw_id)
          .input('Latitude', sql.Float, gateway.latitude)
          .input('Longitude', sql.Float, gateway.longitude)
          .input('Altitude', sql.Float, gateway.altitude)          
          .input('Channel', sql.Int, gateway.channel)
          .input('RSSI', sql.Int, gateway.rssi)
          .input('SNR', sql.Float, gateway.snr)
          .input('RFChain', sql.Int, gateway.rf_chain)
          .execute('dbo.addTtnGwMessage');


      }, this);
    }

  }

  return { status: 'ok' }
};

const getTtnGateways = async (query) => {
  let result = await pool.request()
            .query('select * from dbo.Gateway')
  return result.recordset;
};

const getGpsTrakers = async () => {
  let result = await pool.request()
            .query('select * from dbo.GpsTracker')
  return result.recordset;
};

const getGpsLogs = async () => {
  let data= await pool.request().query('select top(1000) log.*, tracker.TTNDeviceId from dbo.GpsLog as log inner join dbo.GpsTracker as tracker on log.GpsTrackerId = tracker.Id order by log.LogTime desc')
  return data.recordset;
};

const getGpsLogsMapData = async () => {
  let data= await pool.request().query('select top(1000) Id as id, LogTime as time, Latitude as lat, Longitude as lon, Altitude as alt from dbo.GpsLog order by LogTime desc')
  return data.recordset;
};

module.exports = {
  addTtnMessage,
  getTtnGateways,
  getGpsTrakers,
  getGpsLogs,
  getGpsLogsMapData
}

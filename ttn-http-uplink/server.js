var ttn = require('ttn');
var request = require('request');
var config = require('./config');

var client = new ttn.data.MQTT(config.region, config.appId, config.accessKey);

client.on('connect', function(connack) {
  console.log('[DEBUG]', 'Connect:', connack);
  console.log('[DEBUG]', 'Protocol:', client.mqtt.options.protocol);
  console.log('[DEBUG]', 'Host:', client.mqtt.options.host);
  console.log('[DEBUG]', 'Port:', client.mqtt.options.port);
});

client.on('error', function(err) {
  console.error('[ERROR]', err.message);
});

client.on('activation', function(deviceId, data) {
  console.log('[INFO] ', 'Activation:', deviceId, JSON.stringify(data, null, 2));
});

client.on('message', function(deviceId, data) {

  data.payload_raw = data.payload_raw.toString('base64');

  console.info('[INFO] ', 'Message:', deviceId, JSON.stringify(data, null, 2));

  request.post('http://localhost:3300/api/ttn-message',  
    { json: data },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    })

  var b = Buffer.from(data.payload_raw, 'base64');
  console.info('[INFO] ', 'buffer:', b);

});

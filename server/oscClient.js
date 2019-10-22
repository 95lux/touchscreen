var config = require('../config.js');

const OSC = require('osc-js')

var HOST = config.udpClients[0].host;
var PORT = config.udpClients[0].port;
const plugin = new OSC.DatagramPlugin({ send: { port: PORT, host: HOST }})
const osc = new OSC({ plugin: plugin })

var response = function(err, bytes) {
  if (err) throw err;
  console.log('OSC message sent to ' + HOST +':'+ PORT);
}

module.exports = (message, callback) => {

const msg = new OSC.Message('/cues/Bank-1/cues/by_name/'+message);
    osc.send(msg);
}

// Tuomo Bluetooth-Controller (Multimedia Guide)
/*
var dgram = require('dgram');
var client = dgram.createSocket('udp4');

var PORT = 4711;
var HOST = '192.168.235.44';

var response = function(err, bytes) {
  if (err) throw err;
  console.log('UDP message sent to ' + HOST +':'+ PORT);
}

module.exports = (message, callback) => {
  client.send(message, 0, message.length, PORT, HOST, callback);
}
*/



// for the presentation....
// MadMapper using OSC
// https://github.com/adzialocha/osc-js/wiki

//var dgram = require('dgram');
//var client = dgram.createSocket('udp4');
const OSC = require('osc-js')

var PORT = 5000;
// var HOST = '192.168.200.14';
var HOST = '192.168.235.201';

const plugin = new OSC.DatagramPlugin({ send: { port: PORT, host: HOST }})
const osc = new OSC({ plugin: plugin })

var response = function(err, bytes) {
  if (err) throw err;
  console.log('OSC message sent to ' + HOST +':'+ PORT);
}

module.exports = (message, callback) => {
  //client.send(message, 0, message.length, PORT, HOST, callback);
  //const msg = new OSC.Message('/cues/Bank-1/cues/start_by_number', message);
  //const msg = new OSC.Message('/cues/Bank-1/scenes/by_name/Scene-1', message);
  //const msg = new OSC.Message('/medias/Wetter.mp4/play_forward', 1);
  //const msg = new OSC.Message(message, 1);
const msg = new OSC.Message('/cues/Bank-1/cues/by_name/'+message);
    console.log("OSC MSG sent");
    osc.send(msg);
}

var app = require('express')();
var config = require('../config.js')

var http = require('http').createServer(app);
var io = require('socket.io')(http);

http.listen(config.socketPort, function () {
    console.log(`SocketServer listening on localhost:${config.socketPort}`);
});

module.exports = io

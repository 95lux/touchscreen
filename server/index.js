var path = require('path');
var Server = require('./http.js');

var udpClient = require('./udpClient.js');
var oscClient = require('./oscClient.js');
var udpServer = require('./udpServer.js');
var socketServer = require('./websocket.js');
var config = require('../config.js');

var httpServer = new Server(config.httpPort, 'localhost');

// start udp server with given connection information
udpServer(config.udpServers[0], socketServer);

var templateBaseURL = __dirname + '/../templates/';

// serve static html pages
httpServer.app.get('/:page?', (req, res, next) => {
    var page = req.params.page || 'index.html';

    res.sendFile(path.join(templateBaseURL + page));
})

socketServer.on('connection', function(socket) {

    console.log('socketclient connected');
    socket.on('action1', (videoMsg) => {
        oscClient(videoMsg, (error, bytes) => {
        })
    })
    socket.on('action2', (videoMsg) => {
        var connection = config.udpClients[1];
        setTimeout(() => {
            udpClient(connection).send(videoMsg, (error, bytes) => {
            })
        }, config.contentDelay)
    })
    socket.on('action3', (videoMsg) => {
        var connection = config.udpClients[2];
        setTimeout(() => {
            udpClient(connection).send(videoMsg, (error, bytes) => {
            })
        }, config.contentDelay)
    })
})

httpServer.run()

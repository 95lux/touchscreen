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
// beispiel: http://localhost:3000/klima
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
        udpClient(connection).send(videoMsg, (error, bytes) => {
        })
    })
    socket.on('action3', (videoMsg) => {
    var connection = config.udpClients[2];
        udpClient(connection).send(videoMsg, (error, bytes) => {
        })
    })
    // socket.on('action', (videoMsg) => {
    //     console.log('this should be 3');
    //     var connection = config.udpClients[videoMsg.substr(0,1)];
    //     // console.log(connection);
    //     var videoName = videoMsg.substr(2);
    //     // console.log(videoName);
    //
    //         if (videoName.startsWith("A") == false){
    //             // console.log(videoName+" sent");
    //             udpClient(connection).send(videoName, (error, bytes) => {
    //                 return;
    //             })
    //         } if (videoName.startsWith("A") == true){
    //             oscClient(videoName, (error, bytes) => {
    //                 return;
    //             })
    //         }
    // })

})








httpServer.run()

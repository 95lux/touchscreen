const dgram = require('dgram');

module.exports = (connection, socketServer) => {

    const server = dgram.createSocket('udp4');

    server.on('error', (err) => {
        console.log(`server error:\n ${err.stack}`);
    });

    server.on('close', function() {
        console.log('Client UDP socket closed : BYE!');
    });

    server.on('message', (msg, rinfo) => {
        console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
        // if (msg == 'start') {
        //     socketServer.socketSend('transport', msg);
        // }
        if (msg == 'home') {
            socketServer.socketSend('idle', "IDLE");

        }
        if (isNaN(msg) == false && msg != 'start') {
            socketServer.socketSend('duration', msg.toString());
            // console.log(`${msg} send to socketclient`);

        }

    });

    server.on('listening', () => {
        const address = server.address();
        console.log(`UDP-Server listening ${address.address}:${address.port}`);
    });

    server.bind(connection.port, connection.host);
}

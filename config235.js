module.exports = {
    socketPort: 5012,
    httpPort: 3000,
    udpServers: [{
        // host: '192.168.235.220',
        host: '192.168.200.210',
        // host: '127.0.0.1',
        port: 5000
    }],
    udpClients: [{
        //VideoServer MadMapper
        host: '192.168.200.210',
        // host: '192.168.235.221',
        port: 5000
    }, {
        //Brightsign Monitor
        host: '192.168.200.12',
        // host: '192.168.200.210',
        port: 5000
    }, {
        //Tuomi Beacon Mediaguide
        // host: '192.168.200.202',
        host: '192.168.200.202',
        port: 4711
    }]
};

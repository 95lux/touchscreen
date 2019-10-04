module.exports = {
    socketPort: 5012,
    httpPort: 3000,
    udpServers: [{
        host: '192.168.200.16',
        // host: '192.168.235.201',
        port: 5000
    }],
    udpClients: [{
        //VideoServer MadMapper
        host: '192.168.200.14',
        port: 5000
    }, {
        //Brightsign Monitor
        host: '192.168.200.12',
        port: 5000
    }, {
        //Tuomi Beacon Mediaguide
        host: '192.168.200.202',
        port: 4711
    }]
};

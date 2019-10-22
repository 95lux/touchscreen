var dgram = require('dgram');
var client = dgram.createSocket('udp4');

var response = function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT);
}

// Diese Funktion erwartet die connection daten zum verbinden mit dem udp server
module.exports = (connection) => {
    // console.log(connection)
    // danach wird eine methode zurückgesendet, hier in
    return {
        send: (message, callback) => {
            // console.log(message);
            var bytesFrom = 0;
            var bytesTo = message.length;
            console.log('send to server '+message);
            client.send(message, bytesFrom, bytesTo, connection.port, connection.host, callback);
        }
    }
}

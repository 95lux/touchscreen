var socketIO = require('socket.io-client');
var axios = require('axios');
var config = require('../config.js');

// loaderApp variables
var ctx = document.getElementById('loader_canvas').getContext('2d');
var al = 0;
// atl =  time to load in ms
var atl = 0;
var start = 4.72
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var diff;

var isBlocked = false

var strokeStyles = ['#d6a780',
                    '#d6a780',
                    '#c6e5ff',
                    '#bad74f',
                    '#f7d561',
                    '#f03845'];
function log(data) {
    console.log(data)
}

window.sendEvent = function(event, action1, action2, action3) {
    var category = action2.substring(2,3);
    category = parseInt(category, 10)
    console.log(category);
    console.log(strokeStyles[category]);

    if (isBlocked) {
        //VIDEO BLOCK HIER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // event.preventDefault();
        console.log('video blocked!');
        return false;

    } else {
        ctx.strokeStyle = strokeStyles[category];

        // console.log(event, action1, action2, action3);

        // http://localhost:3000/play/wetter
        // then success
        // catch error
        axios.get(`http://localhost:${config.httpPort}/send/0/` + action1).then(log).catch(log);
        axios.get(`http://localhost:${config.httpPort}/send/1/` + action2).then(log).catch(log);
        axios.get(`http://localhost:${config.httpPort}/send/2/` + action3).then(log).catch(log);

    }
}

// socket.io client io
var socket = socketIO(`http://localhost:${config.socketPort}`);

//socket.io events
socket.on('connection', function() {
    console.log('client connected to server!');
});

socket.on('transport', function(msg) {
    console.log('start is emited!');
});

socket.on('videoNumber', function(msg) {
    console.log(msg);

});

socket.on('duration', function(msg) {
    var msgDuration = parseInt(msg, 10);
    console.log(msg);
//VIDEO BLOCK HIER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // if (isBlocked) {
        //     console.log('bar blocked');
        //     return false
        // }
        //isBlocked = true
            atl = msg;
            function progressSim() {
                    diff = ((al / atl*50) * Math.PI * 2 * 10).toFixed(2);
                    ctx.clearRect(0, 0, cw, ch);
                    ctx.lineWidth = 19;

                    // ctx.strokeStyle = "#09F";
                    ctx.beginPath();
                    // .arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
                    ctx.arc(150, 154, 132, start, diff/10+start, false);
                    ctx.stroke();
                    if (al >= (atl/50)) {
                        clearTimeout(sim);
                        console.log('video finished');
                        ctx.clearRect(0, 0, cw, ch);
                        al = 0;
                    }
                    al++;
            }
            var sim = setInterval(progressSim, 50)
            setTimeout(function () {
                isBlocked = false
                console.log('bar unblocked');
            }, msgDuration)
});

socket.on('idle', function(){
    window.location.href = "/index.html";
    axios.get(`http://localhost:${config.httpPort}/send/0/A-IDLE`).then(log).catch(log);
    // sendEvent(event, "A-IDLE", undefined, undefined);

})

window.show = function (id){
    document.getElementById(id).style.display ='block';
}

window.hide = function (id){
    document.getElementById(id).style.display ='none';
}

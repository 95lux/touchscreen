var socketIO = require('socket.io-client');
var config = require('../config.js');

var socket = socketIO(`http://localhost:${config.socketPort}`, {
    forceNew: true,
    reconnection: true,
    reconnectionDelay: 8000,
    reconnectionAttempts: 99999
});

var playOverlay
var action = sessvars.action
// console.log('action');
// loaderApp variables
ctx = document.getElementById('loader_canvas').getContext('2d');
var al = 0;
// atl =  time to load in ms
var atl = 0;
var start = 4.72
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var diff;
ctx.strokeStyle = sessvars.color;

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

var links = ['/geologie.html',
            '/klima.html',
            '/lebensraeume.html',
            '/nationalpark.html',
            '/besuch.html']

window.hrefTo = function(link) {
    if(isBlocked){
        return false;
    } else {
        window.location = links[link];
    }

}
window.sendEvent = function(event, action1, action2, action3) {
    sessvars.action = action1;
    var category = action2.substring(2,3);
    category = parseInt(category, 10)
    console.log(category);
    console.log(strokeStyles[category]);
    action = action1;
    // console.log(action1.substr(0,4)+'!!!');

    if (isBlocked) {
        //VIDEO BLOCK HIER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        // event.preventDefault();
        console.log('video blocked!');
        return false;

    } else {
        // ctx.strokeStyle = strokeStyles[category];
        sessvars.color = strokeStyles[category];

        // socket.emit('action', '1/' + action2);
        // socket.emit('action', '2/' + action3);
        // socket.emit('action', '0/' + action1);

        socket.emit('action2',action2);
        socket.emit('action3',action3);
        socket.emit('action1',action1);


    }
}

// socket.io client io
var socket = socketIO(`http://localhost:${config.socketPort}`);

//socket.io events
socket.on('connection', function() {
    console.log('client connected to server!');
});

// socket.on('transport', function(msg) {
//     console.log('start is emited!');
// });

socket.on('videoNumber', function(msg) {
    console.log(msg);
});

var newTrigger = false;

socket.on('duration', function(msg) {
    playOverlay = sessvars.action.substr(2,5);
    // document.getElementById(playOverlay).style.display ='block';
    // document.getElementById(playOverlay).style.opacity = 1;
    document.getElementById(playOverlay).classList.toggle('overlayVisible');

    var msgDuration = parseInt(msg, 10);
    console.log(msg);
//VIDEO BLOCK HIER!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        if (isBlocked) {
            console.log('video blocked');
            return false
        }
        isBlocked = true
        if(newTrigger){
            clearInterval(sim);
            clearTimeout(sim);
            console.log('video unterbrochen');
            ctx.clearRect(0, 0, cw, ch);
            al = 0;
            atl = 0
            newTrigger = false;
        }
        newTrigger = true;

        //Nur Einführung nicht blocken
        // if (action.substr(4) == '0'){
        //     isBlocked = false;
        // }
        atl = msg-50;
        function progressSim() {
            diff = ((al / atl*50) * Math.PI * 2 * 10).toFixed(2);
            ctx.clearRect(0, 0, cw, ch);
            ctx.lineWidth = 16;
            // ctx.strokeStyle = "#09F";
            ctx.beginPath();
            // .arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
            ctx.arc(150, 153, 134.5, start, diff/10+start, false);
            ctx.stroke();
            if (al >= (atl/50)) {
                newTrigger = false;
                console.log('newTrigger = false');
                clearTimeout(sim);
                console.log('video finished');
                ctx.clearRect(0, 0, cw, ch);
                al = 0;
                isBlocked = false
                console.log('video unblocked');
                socket.emit('action1',action.substr(0,3) + '_IDLE');
                console.log('SubIdle Emit');
                if (document.getElementById(playOverlay) !== null){
                    document.getElementById(playOverlay).classList.toggle('overlayVisible');
                    // document.getElementById(playOverlay).style.opacity = 0;
                    // document.getElementById(playOverlay).style.display = 'none';
                }
            }
            al++;
        }

        window.sim = setInterval(progressSim, 50);
        // setTimeout(function () {
        //     if(newTrigger){
        //         clearTimeout();
        //         console.log('SubIdleTimer unterbrochen!');
        //         return;
        //     }
        //         // isBlocked = false
        //         // console.log('video unblocked');
        //         // socket.emit('action1',action.substr(0,3) + '_IDLE');
        //         // console.log('SubIdle Emit');
        //
        //
        // }, (msgDuration+150))

});

socket.on('idle', function(){
    window.location.href = "/index.html";
    // axios.get(`http://localhost:${config.httpPort}/send/0/A-IDLE`).then(log).catch(log);
    socket.emit('action1', 'A-IDLE');
})

window.show = function (id){
    document.getElementById(id).style.display ='block';
}

// window.showPlayOverlay = function (id){
//     document.getElementById(id).style.display ='block';
//     playOverlay = id;
// }

window.hide = function (id){
    document.getElementById(id).style.display ='none';
}

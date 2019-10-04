// var socket = require("socket.io-client")("http://localhost:5002");


var httpCall1 = new XMLHttpRequest();
var httpCall2 = new XMLHttpRequest();
var httpCall3 = new XMLHttpRequest();


// socket.io client io
const socket = io('http://localhost:5002')

// loaderApp variables

var ctx = document.getElementById('my_canvas').getContext('2d');
var al = 0;
var sim = setInterval(progressSim, 50);

// atl =  time to load in ms
var atl = 12000;
var start = 4.72
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var diff;


function send1(event, action1, action2, action3) {
  console.log(event, action1, action2, action3);


  // event.preventDefault();

  // http://localhost:3000/play/wetter

  // for the BrightSign A (Topografie)
  httpCall1.open("GET", "http://192.168.235.201:3000/play1/" + action1);
  httpCall1.send();
  // for the BrightSign B (Screen)
  httpCall2.open("GET", "http://192.168.235.201:3000/play2/" + action2);
  httpCall2.send();
  // For the Tuomo Bloototh-Controller (Multimedia Guide)
  httpCall3.open("GET", "http://192.168.235.201:3000/play3/" + action3);
  httpCall3.send();
}


//socket.io client events
socket.on('connection', function(){
    console.log('client connected to server!');
})


socket.on('transport', function(msg){
    console.log('start is emited!');

});

socket.on('duration', function(msg){
      progressSim(msg);
      console.log('duration emit!');
});

function progressSim(length) {
      diff = ((al / length*50) * Math.PI * 2 * 10).toFixed(2);
      ctx.clearRect(0, 0, cw, ch);
      ctx.lineWidth = 10;
      ctx.strokeStyle = "#09F";
      ctx.beginPath();

      // .arc(x, y, radius, startAngle, endAngle [, anticlockwise]);
      ctx.arc(77.5, 77.5, 72.5, start, diff / 10 + start, false);
      ctx.stroke();
      if (al >= (length/50)) {
        clearTimeout(sim);
        console.log('test');
      }
      al++;
    }

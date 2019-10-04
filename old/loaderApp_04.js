var ctx = document.getElementById('my_canvas').getContext('2d');
var al = 0;
var start = 4.72
var cw = ctx.canvas.width;
var ch = ctx.canvas.height;
var diff;


function progressSim(){
    diff = ((al / 100) * Math.PI*2*10).toFixed(2);
    ctx.clearRect(0, 0, cw, ch);
    ctx.lineWidth = 19;
    ctx.fillStyle = '#f7d561';
    ctx.strokeStyle = '#f7d561';
    ctx.beginPath();
    ctx.arc(150, 154, 132, start, diff/10+start, false);
    ctx.stroke();
    if(al >= 100){
        clearTimeout(sim);
          // Add scripting here that will run when progress completes
}
al++;
}

var sim = setInterval(progressSim, 50);










$ = function(id) {
  return document.getElementById(id);
}

var show = function(id) {
	$(id).style.display ='block';
}
var hide = function(id) {
	$(id).style.display ='none';
}

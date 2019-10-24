$(function()  {

// get a refrence to the canvas and its context
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var stardust = new Image();
stardust.src = "stardust.gif";
var asteroid = new Image();
asteroid.src = "asteroid.gif";
var newstar = new Image();
newstar.src = "newstar.gif";
var gas = new Image();
gas.src = "gas.gif";

var images = [stardust, asteroid, newstar, gas];

// newly spawned objects start at Y=25
var spawnLineY = 25;

// spawn a new object every 1500ms
var spawnRate = 250;

// set how fast the objects will fall
var spawnRateOfDescent = 5.00;

// when was the last object spawned
var lastSpawn = -1;

// this array holds all spawned object
var objects = [];

// save the starting time (used to calc elapsed time)
var startTime = Date.now();
var x;
// start animating



function spawnRandomObject() {

    // select a random type for this new object
    var t;

    // About Math.random()
    // Math.random() generates a semi-random number
    // between 0-1. So to randomly decide if the next object
    // will be A or B, we say if the random# is 0-.49 we
    // create A and if the random# is .50-1.00 we create B

     if (Math.random() < 0.50)
		{
        t = stardust;
		} 
	else if (Math.random() > 0.50 && Math.random() < .65)
		{
        t = asteroid;
		} 
	else if (Math.random() > 0.65 && Math.random() < .80)
		{
        t = newstar;
		} 
	else{t = gas;} 

    // create the new object
    var object = {
        // get random image
        img: t,
        // set x randomly but at least 15px off the canvas edges
        x: Math.random() * (canvas.width - 30) + 15,
        // set y to start on the line where objects are spawned
        y: spawnLineY,
    }

    // add the new object to the objects[] array
    objects.push(object);
}



function animate() {

    // get the elapsed time
    var time = Date.now();

    // see if its time to spawn a new object
    if (time > (lastSpawn + spawnRate)) {
        lastSpawn = time;
        spawnRandomObject();
    }

    // request another animation frame
    requestAnimationFrame(animate);

    // clear the canvas so all objects can be 
    // redrawn in new positions
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw the line where new objects are spawned
    ctx.beginPath();
    ctx.moveTo(0, spawnLineY);
    ctx.lineTo(canvas.width, spawnLineY);
    ctx.stroke();

    // move each object down the canvas
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        object.y += spawnRateOfDescent;
		ctx.drawImage(object.img, object.x, object.y, 30, 30);
    }

}


});



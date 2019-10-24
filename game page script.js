/* document.onkeydown = checkkey;
function checkkey(e) {

    e = e || window.event;

    if (e.keyCode == '37') {
        var element = document.getElementById('ship');
		if (parseInt(element.style.left)  >= 10) {
			element.style.left = parseInt(element.style.left) - 15 + 'px';
		}
		
		
    }
     if (e.keyCode == '39') {
       var element = document.getElementById('ship');
	   if (parseInt(element.style.left)  <= 1300) {
		element.style.left = parseInt(element.style.left) + 15 + 'px';
	   }
    }

}
 */
 


// get a refrence to the canvas and its context

var canvas, ctx;



var stardust = new Image();

stardust.src = "stardust.png";

var asteroid = new Image();

asteroid.src = "asteroid.gif";

var newstar = new Image();

newstar.src = "newstar.gif";

var gas = new Image();

gas.src = "gas.gif";

var logo = new Image();
logo.src = "logo.png";

var captain = new Image();
captain.src = "Captain Blaze.gif";



var width = 800;

var height = 576;

var speed = 3;

var rightKey = false;

var leftKey = false;

var ship;

var ship_x = (width / 2) - 25;

var ship_y = height - 75;

var ship_w = 50;

var ship_h = 50;

var score = 0
var lives = 3

starX = 0, starY = 0, starY2 = -576 ;
gameStarted = false
intro = false 
gameover = false

                


var images = [stardust, asteroid, newstar, gas];


// newly spawned objects start at Y=25

var spawnLineY = -10;


// spawn a new object every 1500ms

var spawnRate = 150;


// set how fast the objects will fall

var spawnRateOfDescent = 3.00;


// when was the last object spawned

var lastSpawn = -1;


// this array holds all spawned object

var objects = [];


// save the starting time (used to calc elapsed time)

var startTime = Date.now();

var x;

function collision() 
{
  var ship_xw = ship_x + ship_w;
    var ship_yh = ship_y + ship_h;
  for (var i = 0; i < objects.length; i++) 
  {
	var object = objects[i];
  
    if (ship_x > object.x && ship_x < (object.x + 30) && ship_y > object.y && ship_y < (object.y + 30)) 
	{
		if (object.img== stardust)
			{score +=1;}
		else 
			{lives -=1;}
		
		objects.splice(i,1);
	  
    }
    else if (ship_xw < (object.x + 30) && ship_xw > object.x && ship_y > object.y && ship_y < (object.y + 30)) 
	{
		if (object.img== stardust)
			{score +=1;}
		else 
			{lives -=1;}
		objects.splice(i,1);
    }
    else if (ship_yh > object.y && ship_yh < (object.y + 30) && ship_x > object.x && ship_x < (object.x + 30)) 
	{
		if (object.img== stardust)
			{score +=1;}
		else 
			{lives -=1;}
		objects.splice(i,1);
	  
    }
    else if (ship_yh > objects.y && ship_yh < (object.y + 30) && ship_xw < (object.x + 30) && ship_xw > object.x)
	{
      	if (object.img== stardust)
			{score +=1;}
		else 
			{lives -=1;}
		objects.splice(i,1);
	  
    }
	else if ((ship_x+15) > object.x && (ship_x+15) < (object.x + 30) && (ship_y+15) > object.y && (ship_y+15) < (object.y + 30)) 
	{
		if (object.img== stardust)
			{score +=1;}
		else 
			{lives -=1;}
		objects.splice(i,1);
	  
    }
	else if ((ship_x+15) > (object.x+15) && (ship_x+15) < (object.x + 30) && (ship_y+15) > object.y && (ship_y+15) < (object.y + 30)) 
	{
		if (object.img== stardust)
			{score +=1;}
		else 
			{lives -=1;}
		objects.splice(i,1);
	  
    }
  }
}


function spawnRandomObject() {


    // select a random type for this new object

    var t;

    var rand= Math.random()

    // between 0-1 to randomly decide which image the next object will be


     if (rand < 0.50)

        {

        t = stardust;

        } 

    else if (rand > 0.50 && rand < .65)

        {

        t = asteroid;

        } 

    else if (rand > 0.65 && rand < .80)

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





function clearCanvas() {

 ctx.clearRect(0,0,width,height);

}


function drawShip() {

 if (rightKey) ship_x += 10;

 else if (leftKey) ship_x -= 10;

 if (ship_x <= 0) ship_x = 0;

 if ((ship_x + ship_w) >= width) ship_x = width - ship_w;

  if (ship_y <= 0) ship_y = 0;

 if ((ship_y + ship_h) >= height) ship_y = height - ship_h;

        ctx.drawImage(ship, ship_x, ship_y,50, 50);

}


function init() {

    canvas = document.getElementById("canvas");

    ctx = canvas.getContext("2d");

 ship = new Image();

 ship.src = "rocket.gif";

 setInterval(gameLoop, 25);

document.addEventListener('keydown', keyDown, false);

document.addEventListener('keyup', keyUp, false);
starfield = new Image();
starfield.src = 'background space.png';

canvas.addEventListener('click', gameStart, false);



}

function scoretotal () {
	ctx.font = 'bold 18px Arial';
	ctx.fillStyle = '#fff';
	ctx.fillText('Score: ', 700, 30);
	ctx.fillText(score, 760, 30);
	ctx.fillText('Lives: ', 40, 30);
	ctx.fillText(lives, 100, 30);


	if (!gameStarted && !intro && !gameover) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawStarfield();
	ctx.drawImage(logo,100,100);
   ctx.fillText('Click to Play', width / 2 - 56, height / 2 + 100);
   ctx.fillText('Use arrow keys to move', width / 2 - 100, height / 2 + 130);
  
}
   if(!gameStarted && intro && !gameover){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawStarfield();
	ctx.fillStyle="black";
	ctx.fillRect(10, 425, 780, 140);
	ctx.font = 'bold 18px Courier New';
	ctx.fillStyle = 'white';
	ctx.fillText('Hey there pilot! We need your help to collect ',200,450);
	ctx.fillText('Stardust. But make sure to avoid hazards ',200,470);
	ctx.fillText('like asteroids, gases, and baby stars. ',200,490);
	ctx.fillText('These are dangerous and will harm you, but im sure',200,510);
	ctx.fillText('a pilot like yourself will have no problem ',200,530);
	ctx.fillText('Good Luck!    Click to continue. ',200,550);
	ctx.lineWidth="1";
	ctx.strokeStyle="white";
	ctx.rect(190,430,560,130);
	ctx.stroke();
	ctx.drawImage(captain,20,425);
	ctx.fillText('Captain Blaze',20,555);
	
	
 }
  
 
 

}

function drawStarfield() {
  ctx.drawImage(starfield,starX,starY);
  ctx.drawImage(starfield,starX,starY2);
  if (starY > 576) {
    starY = -575;
  }
  if (starY2 > 576) {
    starY2 = -575;
  }
  starY += 1;
  starY2 += 1;
}

function gameStart() {
   gameStarted = false;
   intro = true;
   gameover = false;
   canvas.removeEventListener('click', gameStart, false);
   canvas.addEventListener('click', introend, false);
}

function introend(){
	gameStarted = true;
	gameover = false;
	canvas.removeEventListener('click', introend, false);
}

function gameend(){
	gameStarted = false;
	intro = false;
	canvas.addEventListener('click', gameend, false);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawStarfield();
	ctx.drawImage(captain,320,200);
	ctx.font = 'bold 18px Courier New';
	ctx.fillText('Hey There! Dont give up try again. Click anywhere to continue.',80,340);
	canvas.addEventListener('click', startagain, false);
	
}

function startagain(){
	gameStarted = false;
	intro = false;
	gameover = false;
	canvas.removeEventListener('click', startagain, false);
	canvas.addEventListener('click', gameStart, false);
	canvas.removeEventListener('click', gamestart, false);
}

function gameLoop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawStarfield();
 if (gameStarted && intro ) { 
	animate();
	drawShip();
	collision();
	if (lives == 0){
	gameover = true;
	}
 
 
 }
 scoretotal();
 
 if (gameover) {
	 gameend();
 }





 

}


function keyDown(e) {

 if (e.keyCode == 39) rightKey = true;

 else if (e.keyCode == 37) leftKey = true;




}


function keyUp(e) {

 if (e.keyCode == 39) rightKey = false;

 else if (e.keyCode == 37) leftKey = false;


}


function animate()

{


    // get the elapsed time

    var time = Date.now();


    // see if its time to spawn a new object

    if (time > (lastSpawn + spawnRate)) 

    {

        lastSpawn = time;

        spawnRandomObject();

    }


    // request another animation frame

   // requestAnimationFrame(animate);


    //spawnRandomObject();

    // clear the canvas so all objects can be 

    // redrawn in new positions

    // move each object down the canvas

    for (var i = 0; i < objects.length; i++) 

    {

        var object = objects[i];

        object.y += spawnRateOfDescent;

        if (object.img == "stardust.png" ){
			ctx.drawImage(object.img, object.x, object.y, 150, 150);
		} else {
			ctx.drawImage(object.img, object.x, object.y, 50, 50);
		}

        

    }


}




window.onload = init;



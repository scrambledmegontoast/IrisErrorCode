var inc =  0.1;
var scl =  3; //vector scale
var cols, rows;
var zoff =  0;
var particles = [];
var numParticles = 900; 
var flowfield;
var backgroundColor = '#edb4a8';
var lastParticleTime =  0; // Time of the last particle generation
var particleGenerationInterval =  2000; // Interval in milliseconds (10 seconds)
var lastParticle2Time =  0; // Time of the last Particle2 generation


// Define the attraction strength
const ATTRACTION_STRENGTH =  0.9;
const attractionStrength2 =  0.9;

function setup() {
  createCanvas(600,  600);
  // create grid
  cols = floor(width / scl);
  rows = floor(height / scl);

  flowfield = new Array(cols * rows);

  // Define the radius of the circle in the center
  var circleRadius =  50;
  var circleCenterX = width /  2;
  var circleCenterY = height /  2;

  for (var i =   0; i <   numParticles; i++) {
    var posX, posY;
    do {
      posX = random(width);
      posY = random(height);
    } while (dist(posX, posY, width /   2, height /   2) <=   50);

    // Add a small random offset to the position
    posX += random(-10,  10); // Adjust the range as needed
    posY += random(-10,  10); // Adjust the range as needed

    particles[i] = new Particle(createVector(posX, posY));

    var centerPosX = width /  2;
    var centerPosY = height /  2;
    particles.push(new Particle2(createVector(centerPosX, centerPosY)));
  
  }

  background(backgroundColor);
}

function draw() {
  var currentTime = millis();
 // Check if enough time has passed since the last Particle generation
 if (currentTime - lastParticleTime >= particleGenerationInterval) {
  // Generate a new Particle with a small offset
  var posX, posY;
  do {
    posX = random(width) + random(-30,  30); // Random offset for X
    posY = random(height) + random(-30,  30); // Random offset for Y
  } while (dist(posX, posY, width /  2, height /  2) <=  50);
  particles.push(new Particle(createVector(posX, posY)));
  lastParticleTime = currentTime;
}



// Check if enough time has passed since the last Particle2 generation
if (currentTime - lastParticle2Time >= particleGenerationInterval +  particleGenerationInterval) {
  // Generate a new Particle2 with a small offset
  var posX2, posY2;
  do {
    posX2 = random(width) + random(-10,  10); // Random offset for X
    posY2 = random(height) + random(-10,  10); // Random offset for Y
  } while (dist(posX2, posY2, width /  2, height /  2) <=  50);
  particles.push(new Particle2(createVector(posX2, posY2)));
  lastParticle2Time = currentTime;
}

  
  var yoff =  0;
  for (var y =  0; y < rows; y++) {
    var xoff =  0;
    for (var x =  0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI *  4;
      var v = p5.Vector.fromAngle(angle); // create a vector using built in function
      v.setMag(1);
      flowfield[index] = v;
      xoff += inc;
    }
   
    yoff += inc;
    zoff +=  0.003; // controls the speed of the vector movement
  }

  // for loop adding the particles in
  for (var i =  0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  fill(backgroundColor); // Set the fill color to match the background
  noStroke(); // Remove the stroke to make the circle hollow
  // circle(width /  2, height /  2,  50); // Draw the circle at the center with a diameter of  50 pixels
}
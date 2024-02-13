
function degreesToRadians(degrees) {
    return degrees * (Math.PI /  180);
  }
class Particle2 {
  
    // Constructor initializes the particle with random position, velocity, and acceleration,
    // as well as a maximum speed limit and a placeholder for the previous position.
 constructor() {
  // Position at the center of the canvas
  this.pos = createVector(width /  2, height /  2);
  this.vel = createVector(0,  0); // Initial velocity
  this.acc = createVector(0,   0); // Initial acceleration
  this.maxspeed =   2; // Maximum speed limit
  this.prevPos = this.pos.copy(); // Placeholder for previous position
}

update() {
    // Calculate the radius of the circle based on the canvas size
    var radius2 = (width /  2, height /  2);
  
    // Loop through each particle
    for (var i =  0; i < numParticles; i++) {
      // Calculate the angle step for even spacing
      var angleStep2 =  360 / numParticles;
  
      // Convert the angle step to radians
      var angle2 = degreesToRadians(angleStep2 * i);
  
      // Calculate the position of the particle on the circle
      var particleX = width /  2 + radius2 * Math.cos(angle2);
      var particleY = height /  2 + radius2 * Math.sin(angle2);
  
      // Calculate the direction towards the calculated position
      var dir2 = createVector(particleX, particleY).sub(this.pos);
  
      // Normalize the direction vector and scale it by the attraction strength
      var force2 = dir2.normalize().mult(dir2.mag(1) * attractionStrength2);
  
      // Apply the attraction force
      this.applyForce(force2);
    }
  
  
      // Code to handle velocity and position updates
      this.vel.add(this.acc); // Apply acceleration to velocity
      this.vel.limit(this.maxspeed); // Limit the speed
      this.pos.add(this.vel); // Move the particle by velocity
      this.acc.mult(0); // Reset acceleration for the next frame
    }
  

// Follow method calculates the index of the vector field based on the particle's current position
// and applies the corresponding force to the particle.
follow(vectors) {
  var x = floor(this.pos.x / scl); // Calculate the x index
  var y = floor(this.pos.y / scl); // Calculate the y index
  var index = x + y * cols; // Calculate the index in the vector field
  var force = vectors[index]; // Get the force from the vector field
  this.applyForce(force); // Apply the force to the particle
}

// ApplyForce method adds the given force vector to the particle's acceleration
applyForce(force) {
  this.acc.add(force); // Add force to acceleration
}

// Show method draws the particle as a line from its previous position to its current position
show() {

  
  // Set the stroke color to the calculated gradient color
  stroke('#073763');
  
  // Set the stroke weight
  strokeWeight(0.9);
  
  // Draw the line from the previous position to the current position
  line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  
  // Update the previous position
  this.updatePrev();
}

// UpdatePrev method saves the current position as the previous position for the next frame
updatePrev() {
  this.prevPos.x = this.pos.x; // Save the current x position
  this.prevPos.y = this.pos.y; // Save the current y position
}

// Edges method checks if the particle has hit the edge of the window and wraps it around to the opposite edge
edges() {
  if (this.pos.x > width) { // Check if past the right edge
    this.pos.x =  0; // Wrap around to the left edge
    this.updatePrev(); // Update the previous position
  }
  if (this.pos.x <  0) { // Check if past the left edge
    this.pos.x = width; // Wrap around to the right edge
    this.updatePrev(); // Update the previous position
  }
  if (this.pos.y > height) { // Check if past the bottom edge
    this.pos.y =  0; // Wrap around to the top edge
    this.updatePrev(); // Update the previous position
  }
  if (this.pos.y <  0) { // Check if past the top edge
    this.pos.y = height; // Wrap around to the bottom edge
    this.updatePrev(); // Update the previous position
  }
}
}
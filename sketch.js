// Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 2: Array of Particles, multiple forces

var inc = 0.07;
var resolution = 10;
var cols, rows;
var zoff = 0;
var particles = [];
var flowField = [];

function setup() {
  let cnv = createCanvas(500, 500);
  cnv.position(100, 100);
  cols = floor(width / resolution);
  rows = floor(height / resolution);

  flowField = new Array(cols * rows);
  for (var i = 0; i < 200; i++) {
    particles[i] = new Particle();
  }
  background(0);
}

function draw() {
  // Generate 3-d Perlin Noise flow field
  var yoff = 0;
  for (var y = 0; y <= rows; y++) {    
    var xoff = 0;
    for (var x = 0; x <= cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
      xoff += inc;
      
      // push();
      // translate(x * resolution, y * resolution);
      // fill(0, 20);
      // stroke(0, 20);
      // ellipse(0, 0, 3, 3);
      // noFill();
      // stroke(0, 20);
      // rect(0, 0, resolution, resolution);
      // rotate(v.heading());
      // stroke(0, 50);
      // line(0, 0, scl, 0);
      // pop();
    }
    yoff += inc;
    zoff += 0.0004;
  }

  // Update particles' positions and draw to canva
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowField, resolution, cols);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}




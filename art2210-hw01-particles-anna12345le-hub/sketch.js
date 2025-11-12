let particles = [];

function setup() {
	createCanvas(400, 400);
	noStroke();

	for (let i = 0; i < 150; i++) {
		particles.push(new Particle(random(width), random(height)));
	}
}

function draw() {
	background(0);

	if (mouseIsPressed) {
		for (let i = 0; i < 5; i++) {
			particles.push(new Particle(mouseX + random(-8, 8), mouseY + random(-8, 8)));
		}
	}

	for (let i = particles.length - 1; i >= 0; i--) {
		let p = particles[i];
		p.update();
		p.display();
		if (p.isDead()) {
			particles.splice(i, 1);
		}
	}

	if (particles.length < 100) {
		for (let i = particles.length; i < 120; i++) {
			particles.push(new Particle(random(width), random(height)));
		}
	}

	fill(255);
	textSize(12);
	text('Particles: ' + particles.length, 10, height - 10);
}

class Particle {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = p5.Vector.random2D().mult(random(0.2, 2.0));
		this.acc = createVector(0, 0.02);
		this.size = random(4, 14);
		this.lifespan = random(180, 420);
	}

	update() {
		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.lifespan -= 1;

		if (this.pos.x < -this.size) this.pos.x = width + this.size;
		if (this.pos.x > width + this.size) this.pos.x = -this.size;
		if (this.pos.y < -this.size) this.pos.y = height + this.size;
		if (this.pos.y > height + this.size) this.pos.y = -this.size;
	}

	display() {
		push();
		translate(this.pos.x, this.pos.y);
		let a = constrain(map(this.lifespan, 0, 420, 0, 255), 0, 255);
		fill(255, a);
		ellipse(0, 0, this.size);
		pop();
	}

	isDead() {
		return this.lifespan <= 0;
	}
}


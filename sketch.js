const width = 600, height = 600;
var snake = [];
var xSpeed = -1, ySpeed = 0, dir = 'W', fruit, timer = 0;

function setup() {
	createCanvas(width, height);
	var s = new Snake(width / 2, height / 2);
	fruit = new Fruit(100, 60);
	snake.push(s);
}

function draw() {
	background(218, 112, 214);
	fruit.draw();
	for (var i = 0; i < snake.length; i++) {
		if (i == snake.length - 1) {
			snake[i].draw(color(255, 0, 0));
		}
		else {
			snake[i].draw(color(0));
		}
	}
	move();
	timer++;
	if (timer == 300) {
		timer = 0;
		var x = floor(random(10, 590));
		var y = floor(random(10, 590));
		fruit = new Fruit(x, y);
	}
	if (detectCollision()) {
		grow();
		var x = floor(random(10, 590));
		var y = floor(random(10, 590));
		fruit = new Fruit(x, y);
		timer = 0;
	}
}

function Snake(x, y) {
	this.x = x;
	this.y = y;
	this.draw = function(col) {
		fill(col);
		rect(this.x, this.y, 10, 10);
	}
}

function keyTyped() {
	if (key == 'w') {
		if (dir == 'E' || dir == 'W') {
			xSpeed = 0;
			ySpeed = -1;
			dir = 'N';
		}
	}
	else
	if (key == 's') {
		if (dir == 'E' || dir == 'W') {
			xSpeed = 0;
			ySpeed = 1
			dir = 'S';
		}
	}
	else
	if (key == 'a') {
		if (dir == 'N' || dir == 'S') {
			xSpeed = -1;
			ySpeed = 0;
			dir = 'W';
		}
	}
	else
	if (key == 'd') {
		if (dir == 'N' || dir == 'S') {
			xSpeed = 1;
			ySpeed = 0;
			dir = 'E';
		}
	}
	else {
		grow();
	}
}

function grow() {
	var x = snake[snake.length - 1].x + xSpeed * 3;
	var y = snake[snake.length - 1].y + ySpeed * 3;
	var s = new Snake(x, y);
	snake.push(s);
}

function move() {
	var x = snake[snake.length - 1].x + xSpeed * 3;
	var y = snake[snake.length - 1].y + ySpeed * 3;
	if (x == 0) {
		x = 600;
	}
	else
	if (x == 600) {
		x = 0;
	}
	else
	if (y == 600) {
		y = 0;
	}
	else
	if (y == 0) {
		y = 600;
	}
	var s = new Snake(x, y);
	snake.push(s);
	snake.shift();
}

function Fruit(x, y) {
	this.x = x;
	this.y = y;
	this.draw = function() {
		fill(0);
		rect(this.x, this.y, 10, 10);
	}
}

function detectCollision() {
	var head = snake[0];
	//Vertical collision with an offset
	if (head.y + 10 >= fruit.y && head.y <= fruit.y + 10) {
		if (head.x >= fruit.x && head.x <= fruit.x + 10) {
			return true;
		}
	}
	//Simple Vertical collision
	if (head.y >= fruit.y && head.y <= fruit.y + 10) {
		if (head.x >= fruit.x && head.x <= fruit.x + 10) {
			return true;
		}
	}
	//Horizontal collision with an offset
	if (head.x + 10 >= fruit.x && head.x <= fruit.x + 10) {
		if (head.y >= fruit.y && head.y <= fruit.y + 10) {
			return true;
		}
	}
	//Simple Horizontal collision
	if (head.x >= fruit.x && head.x <= fruit.x + 10) {
		if (head.y >= fruit.y && head.y <= fruit.y + 10) {
			return true;
		}
	}
	return false;
}

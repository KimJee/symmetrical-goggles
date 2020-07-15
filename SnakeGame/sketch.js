
const snakeVel = 10;

function setup() {
	createCanvas(600, 600);
	s = new Snake(0, 0, snakeVel, snakeVel);
	f = new Food(floor(random(width)), floor(random(height)));
	frameRate(15);
}

function draw() {
	background(100);
	s.update();
	s.show();

	s.eat(f)
	f.show();
}

function keyPressed() {
	if (keyCode == LEFT_ARROW)
	{
		s.dir(-snakeVel, 0);
	}
	else if (keyCode == RIGHT_ARROW)
	{
		s.dir(snakeVel, 0);
	}
	else if (keyCode == UP_ARROW)
	{
		s.dir(0, -snakeVel);
	}
	else if (keyCode == DOWN_ARROW)
	{
		s.dir(0, snakeVel);
	}
	else
	{

	}
}
/*
	Float x;
	float y;

	Somewhere there's a ellipse


*/


let w;
class Walker {
	constructor(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
	}

	step() {
		let whichDir = floor(random(0, 4));
		
		if (whichDir == 0)
		{
			this.x += this.speed;
		}
		else if (whichDir == 1)
		{
			this.x -= this.speed;
		}
		else if (whichDir == 2)
		{
			this.y += this.speed;
		}
		else if (whichDir == 3)
		{
			this.y -= this.speed;
		}
		// else if (whichDir == 4)
		// {
		// 	this.x += this.speed;
		// 	this.y += this.speed;
		// }
		// else if (whichDir == 5)
		// {
		// 	this.x -= this.speed;
		// 	this.y += this.speed;
		// }
		// else if (whichDir == 6)
		// {
		// 	this.x -= this.speed;
		// 	this.y -= this.speed;
		// }
		// else if(whichDir == 4)
		// {
		// 	this.x += this.speed;
		// 	this.y -= this.speed;
		// }	
		else
		{
			throw "This should not happen";
		}
	}

	checkBoundary()
	{
		if (this.x >= width || this.x <= 0)
		{
			this.x = width/2;
			this.y = height/2;
		}
		if (this.y >= height || this.y <= 0)
		{
			this.x = width/2;
			this.y = height/2;
		}
	}

};

function markArray(arr, x, y)
{
	arr[x][y] = 1;
	return;
}

let MapArray;
function setup() {
	createCanvas(400, 400);
	background(25, 43, 231);
	w = new Walker(width/2, height/2, 5);
	fill(100);
	rect(w.x, w.y, 5, 5);
	
	MapArray = Array(400);
	for (let i = 0; i < 400; i++)
	{
		MapArray[i] = Array(400).fill(0);
	}
	console.log(MapArray);
	markArray(MapArray, w.x, w.y);
}

function draw() {

	w.step();
	w.checkBoundary();
	//let grey_color = map(w.x, 0, width, 0, 255);
	fill(0, 143, 0); // Maybe we can color based on x position
	markArray(MapArray, w.x, w.y);
	rect(w.x, w.y, 5, 5);

}
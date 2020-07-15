let RainDrops;
let puddle;
function setup() {
	createCanvas(400, 400);
	RainDrops = Array(100);
	for (let i = 0; i < RainDrops.length; i++)
	{
		RainDrops[i] = new Drop(random(width), random(height), random(3, 5))
	}

	let puddle_height = 10;
	puddle = new Puddle(0, height, puddle_height, 400);
	
}

function draw() {
	background(230, 230, 250);
	
	

	for (let i = 0; i < RainDrops.length; i++)
	{
		RainDrops[i].fall(puddle);
		RainDrops[i].show();
	}

	puddle.show();
}
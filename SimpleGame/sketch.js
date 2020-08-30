let Players = [];
let Pellets = [];

let RandomAIs = [];
let BasicAIs = [];
let GreedyAIs = [];
let SpeedBasicAIs = [];
let GravityAIs = [];

const MAX_RADIUS = 100;

const INIT_PELLET_NUM = 1000;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(100);

	// Create the Player
	Player1 = new Player(windowWidth/2, windowHeight/2, 2, 2, 10);
	Players.push(Player1);
	
	// Initial Generation of Pellets
	PopulatePellets(Pellets);

	// Create Adversaries for the Player
	//let FirstAI = new RandomAI();
	//RandomAIs.push(FirstAI);

	//let FirstBasicAI = new BasicAI();
	//BasicAIs.push(FirstBasicAI);

	//let FirstGreedyAI = new GreedyAI(windowWidth/2, windowHeight/2, 10, 1, 1, 1);
	//let FirstGreedyAI = new GreedyAI(ChooseRandomNumber(0,windowWidth), ChooseRandomNumber(0, windowHeight), 10, 1, 1, 1);
	//GreedyAIs.push(FirstGreedyAI);

	//let FirstSpeedBasicAI = new SpeedBasicAI();
	//SpeedBasicAIs.push(FirstSpeedBasicAI);

	//let FirstGravityAI = new GravityAI(windowWidth/2, windowHeight/2, 10, 1, 1, 1);
	//GravityAIs.push(FirstGravityAI);

	//frameRate(60);
}

function draw() {
	gameLoop();
}

function gameLoop()
{
	//console.log(getFrameRate());

	// Set the background
	background(100);

	// Draw the player
	drawPlayer();

	// Draw the AI
	drawRandomAI(RandomAIs);

	// Draw Basic AI
	drawBasicAI(BasicAIs);

	// Draw Greedy AI
	drawGreedyAI(GreedyAIs);

	// Draw SpeedBasicAI
	drawSpeedBasicAI(SpeedBasicAIs);

	// Draw GravityAI
	drawGravityAI(GravityAIs);

	// Draw all pellets
	drawPellet(Pellets);


	// Player Action
	for (let i = 0; i < Players.length; i++)
	{
		Players[i].eat(Pellets);
		Players[i].move();
		Players[i].consume(); 
	}
	// Adversary Action(s)

	for (let i = 0; i < RandomAIs.length; i++)
	{
		if (frameCount % 60 == 0)
		{
			RandomAIs[i].pickDirection();
		}
		RandomAIs[i].move();
		RandomAIs[i].eat(Pellets);
		RandomAIs[i].consume();
	}

	for (let j = 0; j < BasicAIs.length; j++)
	{
		BasicAIs[j].move();
		BasicAIs[j].eat(Pellets);
		BasicAIs[j].consume();
	}

	for (let j = 0; j < GreedyAIs.length; j++)
	{
		GreedyAIs[j].move();
		GreedyAIs[j].eat(Pellets);
		GreedyAIs[j].consume();
	}

	for (let j = 0; j < SpeedBasicAIs.length; j++)
	{
		SpeedBasicAIs[j].boostmove();
		SpeedBasicAIs[j].eat(Pellets);
		SpeedBasicAIs[j].consume();
	}

	for (let j = 0; j < GravityAIs.length; j++)
	{
		GravityAIs[j].pull();
		GravityAIs[j].eat(Pellets);
		GravityAIs[j].consume();
	}

	// Current Score
	printScore();

	// Pellet Action
	MakePellet();
}

function printScore()
{
	let output_string = "";
	
	for (let i = 0; i < RandomAIs.length; i++)
	{
		output_string += `RandomAIs[${i}]:${RandomAIs[i].score}\n`;
	}

	for (let j = 0; j < BasicAIs.length; j++)
	{
		output_string += `BasicAIs[${j}]:${BasicAIs[j].score}\n`;
	}

	for (let j = 0; j < GreedyAIs.length; j++)
	{
		output_string += `GreedyAIs[${j}]:${GreedyAIs[j].score}\n`;
	}

	for (let i = 0; i < SpeedBasicAIs.length; i++)
	{
		output_string += `SpeedBasicAIs[${i}]:${SpeedBasicAIs[i].score}\n`;
	}

	for (let i = 0; i < GravityAIs.length; i++)
	{
		output_string += `GravityAIs[${i}]:${GravityAIs[i].score}\n`;
	}

	for (let i = 0; i < Players.length; i++)
	{
		output_string += `Player[${i}]: ${Players[i].score}\n`;
	}
	//console.log(output_string);

	fill(255);
	text(output_string, 10, 10, 70, 80); // Text wraps within text box
}

function drawPlayer()
{
	for (let player = 0; player < Players.length; player++)
	{
		noStroke();
		fill('green');
		ellipse(Players[player].x, Players[player].y, 2*Players[player].r, 2*Players[player].r);
	}
}

function drawRandomAI(AIArray)
{
	for (let i = 0; i < AIArray.length; i++)
	{
		noStroke();
		fill('red');
		ellipse(AIArray[i].x, AIArray[i].y, 2*AIArray[i].r, 2*AIArray[i].r);
		drawLineFromAgentToPellet('red', AIArray[i])
	}
}

function drawBasicAI(AIArray)
{
	for (let i = 0; i < AIArray.length; i++)
	{
		noStroke();
		fill('yellow');
		ellipse(AIArray[i].x, AIArray[i].y, 2*AIArray[i].r, 2*AIArray[i].r);
		drawLineFromAgentToPellets('yellow', AIArray[i])
	}

	// Draw a thin line from AI position to the pellet position
}


function drawGreedyAI(AIArray)
{
	for (let i = 0; i < AIArray.length; i++)
	{
		noStroke();
		fill('blue');
		ellipse(AIArray[i].x, AIArray[i].y, 2*AIArray[i].r, 2*AIArray[i].r);
		drawLineFromAgentToPellets('blue', AIArray[i])
	}
}

function drawSpeedBasicAI(AIArray)
{
	for (let i = 0; i < AIArray.length; i++)
	{
		noStroke();
		fill('green');
		ellipse(AIArray[i].x, AIArray[i].y, 2*AIArray[i].r, 2*AIArray[i].r);
		drawLineFromAgentToPellet('green', AIArray[i])
	}
}

function drawGravityAI(AIArray)
{
	for (let i = 0; i < AIArray.length; i++)
	{
		noStroke();
		fill('orange');
		ellipse(AIArray[i].x, AIArray[i].y, 2*AIArray[i].r, 2*AIArray[i].r);

		drawLineFromAgentToPellets('orange', AIArray[i]);
	}
}

function drawLineFromAgentToPellet(text_color, agent)
{
	stroke(text_color);
	strokeWeight(4);
	line(agent.x, agent.y, agent.targetPellet.x, agent.targetPellet.y);
}

function drawLineFromAgentToPellets(text_color, agent)
{
	stroke(text_color);
	strokeWeight(4);
	
	for (let counter = 0; counter < agent.targetPellets.length; counter++)
	{
		line(agent.x, agent.y, agent.targetPellets[counter].x, agent.targetPellets[counter].y);
	}
}


function drawPellet(_Pellets)
{
	for (let i = 0; i < Pellets.length; i++)
	{
		noStroke();
		fill('white');
		ellipse(_Pellets[i].x, _Pellets[i].y, 10, 10);
	}
}

function PlacePellet(x, y)
{
	let placedPellet = new Pellet(x, y, 5);
	Pellets.push(placedPellet);
}


function PopulatePellets(_Pellets)
{
	for (let i = 0; i < INIT_PELLET_NUM; i++)
	{
		// createPellet()
		let aPellet = new Pellet(ChooseRandomNumber(0, windowWidth), ChooseRandomNumber(0, windowHeight), 5);
		_Pellets.push(aPellet);
	}
}

function MakePellet()
{
	// Some function dependant on the current number of pellets
	// And which 'pellet' season Winter, Spring, Summer, Fall
	
	if (frameCount % 30 == 0)
	{
		let aPellet = new Pellet(ChooseRandomNumber(0, windowWidth), ChooseRandomNumber(0, windowHeight), 5);
		Pellets.push(aPellet);	
	}
}

function calculateDistance(x1, y1, x2, y2)
{
	let dist_x = (x2 - x1)**2;
	let dist_y = (y2 - y1)**2;

	return Math.sqrt(dist_x + dist_y);
}

function ChooseRandomNumber(_min, _max)
{
	return Math.floor(Math.random()*Math.floor(_max) + _min);
}



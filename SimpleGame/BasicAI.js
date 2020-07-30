class BasicAI {
	constructor(_x = windowWidth / 2, _y = windowHeight / 2, _r = 10, _dir = 0, _velx = 1, _vely = 1) {
		this.x = _x;
		this.y = _y;
		this.r = _r;

		// Velocity
		this.velx = _velx;
		this.vely = _vely;

		// Direction it's moving in
		// 0 - no movement
		// 1 - right
		// 2 - up
		// 3 - left
		// 4 - down
		this.dir = _dir;

		// Initializes which pellet they want to get
		this.score = 0;
		this.targetPellets = [];
		this.pelletIndices = [];

		let start_index = ChooseRandomNumber(0, Pellets.length);
		this.pelletIndices.push(start_index);
		for (let i = 0; i < this.pelletIndices.length; i++)
		{
			this.targetPellets.push(Pellets[this.pelletIndices[i]]);
		}
	}

	eat(_Pellets) {
		for (let i = _Pellets.length - 1; i >= 0; i--) {
			if (calculateDistance(this.x, this.y, _Pellets[i].x, _Pellets[i].y) <= (this.r + _Pellets[i].r)) {
				// Delete the pellet from the array
				//console.log("Pellet is eaten");
				//console.log(`Pellet index ${i}`);

				// Removes pellet from the array
				_Pellets.splice(i, 1);

				// Generate a new Pellet in it's place 
				this.grow();

				// Increase score
				this.score += 1;
			}
		}
	}

	move() 
	{
		for (let i = 0; i < this.targetPellets.length; i++) {
			if (this.doesPelletExist(this.targetPellets[i])) {
				if (this.x < this.targetPellets[i].x) {
					this.x += this.velx;
				}
				if (this.x > this.targetPellets[i].x) {
					this.x -= this.velx;
				}
				if (this.y < this.targetPellets[i].y) {
					this.y += this.vely;
				}
				if (this.y > this.targetPellets[i].y) {
					this.y -= this.vely;
				}
			} else {
				this.pickNewPellet();
			}
		}
	}

	
	doesPelletExist(search_pellet) {
		return Pellets.find((elem) => {
			return elem.x == search_pellet.x && elem.y == search_pellet.y;
		});
	}

	pickNewPellet()
	{
		if (Pellets.length == 0)
		{	
			return;
		}

		while (this.pelletIndices.length > 0)
		{
			this.pelletIndices.pop();
		}

		while (this.targetPellets.length > 0)
		{
			this.targetPellets.pop()
		}

		let start_index = ChooseRandomNumber(0, Pellets.length);
		this.pelletIndices.push(start_index);
		for (let i = 0; i < this.pelletIndices.length; i++)
		{
			this.targetPellets.push(Pellets[this.pelletIndices[i]]);
		}
	}

	consume() {
		// If this radius is bigger than default size
		if (this.r > 10) {
			// Shrink the size
			this.r *= 0.9999;
		}
	}

	grow()
	{
		if (this.r < MAX_RADIUS)
		{
			this.r *= 1.01;
		}
	}
	


}

class RandomAI {
	constructor(
		_x = windowWidth / 2,
		_y = windowHeight / 2,
		_r = 10,
		_dir = 0,
		_velx = 1,
		_vely = 1
	) {
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

		this.pickNewPellet();
	
		this.score = 0;
	}

	pickDirection() {
		this.dir = Math.floor(Math.random() * Math.floor(5));
	}

	move() {
		if (this.dir == 0) {
		} else if (this.dir == 1) {
			if (this.x + this.velx <= windowWidth) {
				this.x += this.velx;
			}
		} else if (this.dir == 2) {
			if (this.y - this.vely >= 0) {
				this.y -= this.vely;
			}
		} else if (this.dir == 3) {
			if (this.x - this.velx >= 0) {
				this.x -= this.velx;
			}
		} else if (this.dir == 4) {
			if (this.y + this.vely <= windowHeight) {
				this.y += this.vely;
			}
		} else {
			throw "Invalid direction.";
		}

		this.pickNewPellet();
	}

	eat(_Pellets) {
		for (let i = _Pellets.length - 1; i >= 0; i--) {
			if (
				calculateDistance(this.x, this.y, _Pellets[i].x, _Pellets[i].y) <=
				this.r + _Pellets[i].r
			) {
				// Delete the pellet from the array
				//console.log(`Pellet index ${i}`);

				// Removes pellet from the array
				_Pellets.splice(i, 1);

				// Generate a new Pellet in it's place
				this.r *= 1.02;

				// Add 1 to the score
				this.score += 1;
			}
		}
	}

	consume() {
		// If this radius is bigger than default size
		if (this.r > 10) {
			// Shrink the size
			this.r *= 0.999;
		}
	}

	doesPelletExist() {
		return Pellets.find((elem) => {
			return elem.x == this.targetPellet.x && elem.y == this.targetPellet.y;
		});
	}

	pickNewPellet() {
		if (Pellets.length == 0) {
			return;
		}

		// Initializes which pellet they want to get
		const distanceFromPellet = Pellets.map((aPellet, index) => {
			return [calculateDistance(this.x, this.y, aPellet.x, aPellet.y), index];
		});
		//console.log(distanceFromPellet);

		let currentMin = Number.MAX_VALUE;
		let currentMinIndex = -1;
		for (let index = 0; index < distanceFromPellet.length; index++) {
			if (distanceFromPellet[index][0] < currentMin) {
				currentMin = distanceFromPellet[index][0];
				currentMinIndex = index;
			}
		}

		this.pelletIndex = currentMinIndex;
		this.targetPellet = {
			x: Pellets[this.pelletIndex].x,
			y: Pellets[this.pelletIndex].y,
		};
	}

	consume() {
		// If this radius is bigger than default size
		if (this.r > 10) {
			// Shrink the size
			this.r *= 0.999;
		}
	}
}

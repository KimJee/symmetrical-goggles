// Draw a ball on the screen with a position
class Player {
	constructor(_x = windowWidth / 2, _y = windowHeight / 2, _velx = 1, _vely = 1, _r = 10) {
		this.x = _x;
		this.y = _y;
		this.velx = _velx;
		this.vely = _vely;
		this.r = _r;
		this.score = 0;
	}

	move(keyCode) {
		if (keyIsDown(LEFT_ARROW)) {
			this.x -= this.velx;
		}
		if (keyIsDown(RIGHT_ARROW)) {
			this.x += this.velx;
		}
		if (keyIsDown(UP_ARROW)) {
			this.y -= this.vely;
		}
		if (keyIsDown(DOWN_ARROW)) {
			this.y += this.vely;
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
				this.score += 1;
			}
		}
	}

	consume() {
		// If this radius is bigger than default size
		console.log("Human is Shrinking");
		if (this.r > 10) {
			// Shrink the size
			this.r *= .999;
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

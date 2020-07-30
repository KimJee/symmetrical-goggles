class SpeedBasicAI {
	constructor(_x = windowWidth / 2, _y = windowHeight / 2, _r = 10, _dir = 0, _velx = 1, _vely = 1, _boost = 2) {
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
		this.pelletIndex = ChooseRandomNumber(0, Pellets.length),
		this.targetPellet = 
		{
			x : Pellets[this.pelletIndex].x,
			y : Pellets[this.pelletIndex].y
		}

		this.score = 0;

        this.boost = _boost;
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
				this.r *= 1.02;

				// Increase score
				this.score += 1;
			}
		}
	}

	move() 
	{
		if (this.doesPelletExist())
		{
			if (this.x < this.targetPellet.x)
			{
                this.dir = 1;
				this.x += this.velx;
			}
			else if (this.x > this.targetPellet.x)
			{
                this.dir = 3;
				this.x -= this.velx;
			}
			else if (this.y < this.targetPellet.y)
			{
                this.dir = 2;
				this.y += this.vely;
			}
			else if (this.y > this.targetPellet.y)
			{
                this.dir = 4;
				this.y -= this.vely;
			}
			else
			{
				// Node was found
			}
		}
		else
		{
			this.pickNewPellet();
		}
    }
    
    boostmove()
    {
        // Find the distance in the x direction
        // Find the distance in the y direction

        let x_distance = calculateDistance(this.x, 0, this.targetPellet.x, 0);
        let y_distance = calculateDistance(0, this.y, 0, this.targetPellet.y);

        if (Math.abs(x_distance) > this.boost)
        {
             // Then we should use the boost velocity
            if (this.x < this.targetPellet.x )
            {
                // Position to the left
                this.x += this.boost;
            }
            else
            {
                // Position to the right
                this.x -= this.boost;
            }
        }
        if (Math.abs(y_distance) > this.boost)
        {
            // Move in correct direction by boost velocity rather than normal velocity
            if (this.y < this.targetPellet.y)
            {
                // Move up
                this.y += this.boost;
            }
            else
            {
                // Move down
                this.y -= this.boost;
            }
        }
        this.move();
        // Then we should use the regular velocity 

    }
	
	doesPelletExist()
	{
		return Pellets.find(elem => {return elem.x == this.targetPellet.x && elem.y == this.targetPellet.y;})
	}

	pickNewPellet()
	{
		if (Pellets.length == 0)
		{	
			return;
		}
		this.pelletIndex = ChooseRandomNumber(0, Pellets.length);
		this.targetPellet = 
		{
			x : Pellets[this.pelletIndex].x,
			y : Pellets[this.pelletIndex].y
		}
	}

	consume() {
		// If this radius is bigger than default size
		if (this.r > 10) {
			// Shrink the size
			this.r *= 0.999;
		}
	}

	boost() {
		// If the distance on the from this.x and target.x is greater than PARAM1
		// Instead of moving 1 unit, move 2 units
	}
	


}

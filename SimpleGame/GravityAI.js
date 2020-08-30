const NUM_TARGET_PELLETS = 5;

class GravityAI {
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


        this.targetPellets = [];
        this.pelletIndices = [];
        // Initializes which pellet they want to get 
        this.pickNewPellets();

        this.score = 0;
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

	pull() 
	{
        if (this.targetPellets.length == 0)
        {
            this.pickNewPellets();
        }
        for (let counter = 0; counter < this.targetPellets.length; counter++)
        {
            let search_pellet = this.doesPelletExist(this.targetPellets[counter]);
            //console.log(search_pellet);
            if (this.doesPelletExist(this.targetPellets[counter]))
            {
                this.movePelletTowardsAgent(this.targetPellets[counter]);
            }
            else
            {
                this.pickNewPellets();
            }
        }
	}

	doesPelletExist(search_pellet)
	{
		return Pellets.find(elem => {return elem.x == search_pellet.x && elem.y == search_pellet.y;});
    }
    
    movePelletTowardsAgent(aPellet)
    {
        if (this.x > aPellet.x)
        {
            // Move the pellet towards the agent
            aPellet.x += this.velx;
        }
        if (this.x < aPellet.x)
        {
            // Move the pellet towards the agent
            aPellet.x -= this.velx;
        }

        if (this.y > aPellet.y)
        {
            // Move the pellet towards the agent
            aPellet.y += this.vely;
        }
        if (this.y < aPellet.y)
        {
            // Move the pellet towards the agent
            aPellet.y -= this.vely;
        }
    }

	pickNewPellets()
	{
		if (Pellets.length == 0)
		{	
			return;
        }
        
        // Initializes which pellet they want to get 
        const distanceFromPellet = Pellets.map
        ( (aPellet, index) =>
            {
                return [calculateDistance(this.x, this.y, aPellet.x, aPellet.y), index];
            }        
        )

        //console.log(distanceFromPellet);
    
        // Sort Pellets by distance, grab the first 3 put into the 'target pellet class'
        distanceFromPellet.sort( (a, b) => {
            return a[0] - b[0];
        });

        //console.log(distanceFromPellet); // Sorted by their distance

        // If the array is not empty, empty it

        while(this.targetPellets.length > 0)
        {
            this.targetPellets.pop();
        }

        while(this.pelletIndices.length > 0)
        {
            this.pelletIndices.pop();
        }

        // Pick the min between NUM_TARGET_PELLETS and Pellets.length, and add it to our list
        let c = Math.min(NUM_TARGET_PELLETS, Pellets.length);
        for (let counter = 0; counter < c; counter++)
        {
            // Grab the first counter pellets from the array, and push them unto the indices
            this.pelletIndices.push(distanceFromPellet[counter][1]);

            // Use that index to grab the pellet
            this.targetPellets.push(Pellets[distanceFromPellet[counter][1]]);
        }

        //console.log(`The pelletIndices array is ${this.pelletIndices}`);
        //console.log(`The target pellets is:`);
        //console.log(this.targetPellets);

        

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

const snake_width = 10;
const snake_height = 10;
class Point {
    constructor (_x, _y)
    {
        this.x = _x;
        this.y = _y;
    }
}

class Snake {

	constructor(_x, _y, _velx, _vely)
	{
		this.x = _x;
		this.y = _y;
		this.velx = _velx;
        this.vely = _vely;

        this.length = 1;

        let point = new Point(this.x, this.y);
        this.CoordArray = Array(point);
	}

	update() {

        // Border Detection
         if (this.x + (snake_width) + this.velx > width || this.x + this.velx < 0)
         {
             this.velx = 0;
         }
         if (this.y + (snake_height) + this.vely > height || this.y + this.vely < 0)
         {
             this.vely = 0;
         }

        // Increment the position
		this.x = this.x + this.velx;
        this.y = this.y + this.vely;
        
        let point = new Point(this.x, this.y);
        
        for (let i = 0; i < this.length; i++)
        {
            if (point.x == this.CoordArray[i].x && point.y == this.CoordArray[i].y)
            {
                this.die();
            }
        }

        this.CoordArray.pop();
        this.CoordArray.unshift(point);
        
    }
    
    show() 
    {
        fill(255);
        for (let i = 0; i < this.length; i++)
        {
            rect(this.CoordArray[i].x, this.CoordArray[i].y, snake_width, snake_height);
        }
    }

    dir(_x, _y)
    {
        this.velx = _x;
        this.vely = _y;
    }

    eat(item)
    {
        if (dist(this.x, this.y, item.x, item.y) <= 10)
        {
            console.log("Snake ate food");
            item.relocate();
            this.length += 1;   // Add 1 to the length
            let point = new Point(this.x, this.y);
            this.CoordArray.push(point);
        }
    }

    die()
    {
		this.velx = 0;
        this.vely = 0;
        console.log("You have died");
        this.length = 1;
        this.CoordArray = Array().fill();
    }
}


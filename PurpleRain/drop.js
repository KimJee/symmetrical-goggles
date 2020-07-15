class Drop {
    constructor (_x, _y, spd)
    {
        this.x = _x;
        this.y = _y;
        this.speed = spd
    }

    show() {
        stroke(138, 43, 226);
        line(this.x, this.y, this.x, this.y + 10);
    }

    fall(puddle) {
        this.y += this.speed;

        if (this.y >= height + puddle.height)
        {
            puddle.grow();
            this.y = 0;
        }
    }
}
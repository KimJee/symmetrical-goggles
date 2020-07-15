class Puddle {
    
    constructor(_x, _y, h, w)
    {
        this.x = _x;
        this.y = _y;
        this.height = h;
        this.width = w;
    }

    show()
    {
        fill(138, 43, 226);
        //noFill();
        rect(this.x, this.y, this.width, this.height);
    }

    grow()
    {
        //console.log(this.height);
        if (this.height <= -height)
        {
            this.height = 0;
        }
        this.height -= 0.1;


    }


}

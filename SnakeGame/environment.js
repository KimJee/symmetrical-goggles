class Food {
    constructor (_x, _y)
    {
        this.x = _x;
        this.y = _y;
        this.isVisible = true;
    }

    show() {
        if (this.isVisible == true)
        {
            fill(0);
            rect(this.x, this.y, 10, 10);
        }
        return;
    }

    relocate()
    {
        this.x = random(floor(width - 10));
        this.y = random(floor(height - 10));
    }

}
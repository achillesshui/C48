class Attacher {
    constructor(x, y, r) {
        var options =  {
            isStatic: true
        }
        this.body = Bodies.circle(x,y,r,options);
        World.add(world, this.body);
    }    
    display() {
        circle(this.body.position.x, this.body.position.y, 30);
    }
}
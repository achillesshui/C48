class Plat {
    constructor() {
        var options = {
            isStatic: true
        }
        this.body = Bodies.rectangle(displayWidth/2 , 300, 2000, 30);
        World.add(world, this.body);
    }
    display() {
        rectMode(CENTER);
        push();
        fill("brown");
        rect(displayWidth/2 , 300, 2000, 30);
        pop();
    }
}
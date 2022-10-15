export default class Tennisball{

    constructor(x, y){
        this.x = x;
        this.yZero = y;
        this.y = y - Math.random() * 150;

        this.node = document.createElement("div");
        this.node.classList("tennisball");

        this.node.style.top = this.y + "px";
        this.node.style.left = this.x + "px";

        this.speedY = 2;
        this.velocityY = 0.5;
        
    }

    tick() {
        this.speedY += this.velocityY;

        let y = this.node.offsetTop;

        y += this.speedY;

        if (y > this.yZero) {
            this.speedY = -this.speedY / 1.5;
            y = this.yZero;
        }

        this.node.style.top = y + "px";

    }
}
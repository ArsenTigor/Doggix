export default class Cloud{

    constructor(){

        this.node = document.createElement("div");
        this.node.classList.add("cloud");
        this.parentNode = document.querySelector("#uppersection");
        this.parentNode.append(this.node);
        
        this.separation = document.querySelector("#terrain");

        this.x = -100;
        this.y = Math.random()*400 - 100;
        this.node.style.top = this.y + "px";
        this.node.style.left = this.x + "px";
        
        this.speedX = Math.random() * 5;
    }

    tick() {
        this.x += this.speedX;
        this.node.style.left = this.x + "px";

        if (this.x > screen.width) {
            return false;
        }

        return true; 
    }
}
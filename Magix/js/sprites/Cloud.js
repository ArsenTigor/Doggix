export default class Cloud{

    constructor(){

        this.node = document.createElement("div");

        this.zindex = Math.floor(Math.random() * 3) - 3;
        this.type = Math.floor(Math.random() * 2);

        switch(this.type){
            case 0:
                this.node.classList.add("cloud1");
                break;
            case 1:
                this.node.classList.add("cloud2");
                break;
        }
        this.node.style.zIndex = this.zindex;

        this.parentNode = document.querySelector("#uppersection");
        this.parentNode.append(this.node);
        
        this.separation = document.querySelector("#terrain");

        this.x = -100;
        this.y = Math.random()*40;
        this.node.style.top = this.y + "%";
        this.node.style.left = this.x + "px";
        
        this.speedX = 1;
    }

    tick() {
        this.x += this.speedX;
        this.node.style.left = this.x + "px";

        if (this.x > screen.width) {
            this.node.remove();
            return false;
        }

        return true; 
    }
}
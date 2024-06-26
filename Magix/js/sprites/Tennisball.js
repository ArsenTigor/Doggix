export default class Tennisball{

    constructor(x, y){
        this.removeMe = false;

        this.x = x - 20;
        this.yZero = y - 20;
        this.yShadow = this.yZero + 20;
        this.y = y - Math.random() * 250 - 200;
        this.node = document.createElement("div");
        this.node.classList.add("tennisball");
        this.shadow = document.createElement("div");
        this.shadow.classList.add("tennisballshadow");

        this.node.style.top = this.y + "px";
        this.node.style.left = this.x + "px";

        this.shadow.style.top = this.yShadow + "px";
        this.shadow.style.left = this.x + "px";


        this.parentNode = document.querySelector("#conteneur");
        this.parentNode.append(this.shadow);
        this.parentNode.append(this.node);

        this.speedY = 1;
        this.velocityY = 0.2;
        
    }

    getX(){
        return this.x;
    }

    getY(){
        return this.yZero;
    }


    deleteNode(){
        this.removeMe = true;
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

        if(this.removeMe == true){
            this.node.remove();
            this.shadow.remove();
            return false;
        }

        return true; 

    }
}
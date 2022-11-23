export default class Parallax{
    constructor(){

        this.parentNode = document.querySelector("#background-container");
        this.width = this.parentNode.offsetWidth;

        this.bgTop1 = document.querySelector("#bgtop1");
        this.bgTop2 = document.querySelector("#bgtop2");
        this.bgBottom1 = document.querySelector("#bgbottom1");
        this.bgBottom2 = document.querySelector("#bgbottom2");

        
        this.x1 = 0
        this.x2 = this.width;

        this.bgTop2.style.left = this.x2 + "px"
        this.bgBottom2.style.left = this.x2 + "px"
        
        this.speed = 0.3;
    }

    tick(){

        this.x1 -= this.speed;
        this.x2 -= this.speed;

        if(this.x1 <= -this.width){
            this.x1 = 0
        }
        if(this.x2 <= 0){
            this.x2 = this.width
        }

        this.bgTop1.style.left = this.x1 + "px"
        this.bgBottom1.style.left = this.x1 + "px"
        this.bgTop2.style.left = this.x2 + "px"
        this.bgBottom2.style.left = this.x2 + "px"

        return true;
    }
}
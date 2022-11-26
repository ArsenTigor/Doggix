export default class Walker{
    constructor(parentqueryselector, type, facing){

        this.facing = facing;
        this.parentNode = document.querySelector(parentqueryselector);

        this.node = this.node = document.createElement("div");
        this.parentNode.append(this.node);

        
        if(type == 8 || type == 9 || type == 14 || type == 15 || type == 19 || type == 20 ){
            this.width = 200;
            this.height = 200;
        }
        else {
            this.width = 300;
            this.height = 300;
        }


        this.node.style.position = "absolute";
        this.node.style.backgroundSize = "contain"
        this.node.style.backgroundRepeat = "no-repeat"
        this.node.style.backgroundPosition = "center"
        this.node.style.backgroundImage = "url("+ "../Magix/img/walker/walker" + String(type) + ".gif" + ")";

        this.mainwalker = 150
        this.bottomLimit = this.mainwalker + 25;
        this.topLimit = this.parentNode.offsetHeight - 50;

        if(type != 0){
            this.y = Math.floor(Math.random() * (this.topLimit - this.bottomLimit + 1) + this.bottomLimit);
            this.scale = 1 -((this.y-this.bottomLimit) / (this.topLimit-this.bottomLimit));
           
            if (this.scale < 0.6){
                this.scale = 0.6;
            }
            this.width = this.width * this.scale;
            this.height = this.height * this.scale;
        }
        
        this.node.style.width = this.width + "px";
        this.node.style.height = this.height + "px";
        
        if(type == 0){
            this.x = -10;
            this.vitx = 0;
            this.node.style.bottom = this.mainwalker + "px";
            this.node.style.left = this.x + "px";
            this.node.style.zIndex = 2;
        }
        else{
            this.node.style.bottom = this.y + "px";

            if(this.facing == "left"){
                this.node.style.transform = "scaleX(-1)";
                this.x = this.parentNode.offsetWidth + this.width;
                this.vitx = -Math.random() * 2 - 1;
            }
            else{
                this.x = -this.width;
                this.vitx = Math.random() * 2 + 1
            }
            
            
        }

    }

    tick(){
        this.x = this.x + this.vitx;
        this.node.style.left = this.x + "px";
        
        if(this.facing == "left"){
            if (this.x < -this.width - 25){
                this.node.remove()
                return false;
            }
        }else{
            if (this.x > this.parentNode.offsetWidth){
                this.node.remove()
                return false;
            }
        }
        return true;
    }

}
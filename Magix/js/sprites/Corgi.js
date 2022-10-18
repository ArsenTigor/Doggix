import TiledImage from "../TiledImage.js";

export default class Corgi{
    constructor() {
        let columnCount = 11;
        let rowCount = 16;
        let refreshDelay = 150; //maison
        let loopColumn = true;
        let scale = 3;



        this.node = document.createElement("div");
        this.node.setAttribute('id', 'corgi');

        this.nodeBubble = document.createElement("div");
        this.nodeBubble.setAttribute('id', 'bubble');

        this.parentNode = document.querySelector("#conteneur");
        this.parentNode.append(this.node);
        this.parentNode.append(this.nodeBubble);

        this.terrainNode = document.querySelector("#terrain");

        this.corgi = new TiledImage("img/corgi.png", columnCount, rowCount, refreshDelay, loopColumn, scale, this.node);
        this.corgi.changeRow(3);
        this.corgi.changeMinMaxInterval(3, 8)


        this.initialX = 50;
        this.initialY = 50 + this.terrainNode.offsetTop;
        this.x = this.initialX;
        this.y = this.initialY;
        this.chasingBall = false;
        this.idle = true;
        this.vitX = 0;
        this.vitY = 0;
        this.targetX = 1000;
        this.targetY = 1000;

        this.xbubble = this.x + 75;
        this.ybubble = this.y - 50;



    }

    tick(){

        let ajustedTargetX = this.targetX - 75;
        let ajustedTargetY = this.targetY - 75;

        if(this.x < ajustedTargetX + 2 && this.x > ajustedTargetX - 2){
            this.x = ajustedTargetX;
        }
        else if(this.x < ajustedTargetX) {
            this.x = this.x + this.vitX;
        }
        else if(this.x > ajustedTargetX) {
            this.x = this.x - this.vitX;
        }
        

        if(this.y < ajustedTargetY + 2 && this.y > ajustedTargetY - 2){
            this.y = ajustedTargetY;
        }
        else if(this.y < ajustedTargetY) {
            this.y = this.y + this.vitY;
        }
        else if(this.y > ajustedTargetY) {
            this.y = this.y - this.vitY;
        }

        this.xbubble = this.x + 75;
        this.ybubble = this.y - 50;

        this.nodeBubble.style.top = this.ybubble + "px";
        this.nodeBubble.style.left = this.xbubble + "px";
        this.corgi.tick(this.x, this.y);
        return true;
    }



    setSpeed(posXBall, posYBall){    
        

        this.targetX = posXBall;
        this.targetY = posYBall;
        let distance  =  Math.sqrt((posXBall - this.x)*(posXBall - this.x) + (posYBall - this.y)* (posYBall - this.y))

        if(distance < 400){
            this.vitX = Math.ceil(Math.abs((posXBall - this.x) / 2000));
            this.vitY = Math.ceil(Math.abs((posYBall - this.y) / 2000));
            if(this.x > posXBall){
                this.sniffWalkLeft();
            }
            else{
                this.sniffWalkRight();
            }
        }
        else if ( distance >= 400 && distance < 900){
            this.vitX = Math.ceil(Math.abs((posXBall - this.x) / 1500));
            this.vitY = Math.ceil(Math.abs((posYBall - this.y) / 1500));
            if(this.x > posXBall){
                this.walkLeft();
            }
            else{
                this.walkRight();
            }
        }
        else{
            this.vitX = Math.ceil(Math.abs((posXBall - this.x) / 700));
            this.vitY = Math.ceil(Math.abs((posYBall - this.y) / 700));
            if(this.x > posXBall){
                this.runLeft();
            }
            else{
                this.runRight();
            }
        }
    }

    isIdle(){
        return this.idle;
    }

    stopIdle(){
        this.idle = false;
    }
    
    startIdle(){
        this.idle = true;
    }


    isBallChasing(){
        return this.chasingBall;
    }

    chaseBall(){
        this.chasingBall = true;
    }

    stopChaseBall(){
        this.chasingBall = false;
    }
    
    getX(){
        return this.x;
    }

    getY(){
        return this.y;
    }

    jumpingRight(){
        this.corgi.changeRow(0);
        this.corgi.changeMinMaxInterval(0, 10)
    }

    jumpingLeft(){
        this.corgi.changeRow(8);
        this.corgi.changeMinMaxInterval(0, 10)
    }

    idleRight1(){
        this.corgi.changeRow(1);
        this.corgi.changeMinMaxInterval(0, 4)
    }

    idleLeft1(){
        this.corgi.changeRow(9);
        this.corgi.changeMinMaxInterval(0, 4)
    }

    idleRight2(){
        this.corgi.changeRow(2);
        this.corgi.changeMinMaxInterval(0, 4)
    }

    idleLeft2(){
        this.corgi.changeRow(10);
        this.corgi.changeMinMaxInterval(0, 4)
    }

    sitRight(){
        this.corgi.changeRow(3);
        this.corgi.changeMinMaxInterval(0, 8)
    }

    sitLeft(){
        this.corgi.changeRow(11);
        this.corgi.changeMinMaxInterval(0, 8)
    }

    idleSitRight(){
        this.corgi.changeRow(3);
        this.corgi.changeMinMaxInterval(3, 8)
    }

    idleSitLeft(){
        this.corgi.changeRow(11);
        this.corgi.changeMinMaxInterval(3, 8)
    }

    walkRight(){
        this.corgi.changeRow(4);
        this.corgi.changeMinMaxInterval(0, 4)
    }

    walkLeft(){
        this.corgi.changeRow(12);
        this.corgi.changeMinMaxInterval(0, 4)
    }

    runRight(){
        this.corgi.changeRow(5);
        this.corgi.changeMinMaxInterval(0, 7)
    }

    runLeft(){
        this.corgi.changeRow(13);
        this.corgi.changeMinMaxInterval(0, 7)
    }

    sniffWalkRight(){
        this.corgi.changeRow(7);
        this.corgi.changeMinMaxInterval(0, 7)
    }

    sniffWalkLeft(){
        this.corgi.changeRow(15);
        this.corgi.changeMinMaxInterval(0, 7)
    }

}
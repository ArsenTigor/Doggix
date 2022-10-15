import TiledImage from "../TiledImage.js";

export default class Corgi{
    constructor() {
        let columnCount = 11;
        let rowCount = 16;
        this.refreshDelay = 150; //maison
        let loopColumn = true;
        let scale = 3;

        this.node = document.createElement("div");
        this.node.setAttribute('id', 'corgi');


        this.parentNode = document.querySelector("#terrain");
        this.parentNode.append(this.node);

        this.corgi = new TiledImage("img/corgi.png", columnCount, rowCount, this.refreshDelay, loopColumn, scale, this.node);
        this.corgi.changeRow(3);
        this.corgi.changeMinMaxInterval(3, 8)


        this.initialX = this.parentNode.offsetLeft + 50;
        this.initialY = this.parentNode.offsetTop + 50;
        this.x = this.initialX;
        this.y = this.initialY;

    }

    tick(){
        this.corgi.tick(this.x, this.y);
        return true;
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

    sniffWalkRight(){
        this.corgi.changeRow(15);
        this.corgi.changeMinMaxInterval(0, 7)
    }

}
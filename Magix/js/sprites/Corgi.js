import TiledImage from "../TiledImage.js";

export default class Corgi{
    constructor() {
        let columnCount = 11;
        let rowCount = 8;
        this.refreshDelay = 50;
        this.refreshDelay = 100; //maison
        let loopColumn = true;
        let scale = 3.0;

        this.node = document.createElement("div");
        this.node.setAttribute('id', 'corgi');


        this.parentNode = document.querySelector("#terrain");
        this.parentNode.append(this.node);

        this.corgi = new TiledImage("img/corgi.png", columnCount, rowCount, this.refreshDelay, loopColumn, scale, this.node);
        this.corgi.changeRow(0);
        this.corgi.changeMinMaxInterval(0, 10)


        this.initialX = this.parentNode.offsetLeft + 50;
        this.initialY = this.parentNode.offsetTop + 50;
        this.x = this.initialX;
        this.y = this.initialY;

    }

    tick(){
        this.corgi.tick(this.x, this.y);
        return true;
    }

}
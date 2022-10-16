export default class TerrainObjets{

    constructor(x, y){

        this.node = document.createElement("div");

        this.random =  Math.floor(Math.random() * 1);

        switch(this.random){
            case 0:
                this.node.classList.add("bush");
                break;
        }
       
        this.node.style.top = y + "px";
        this.node.style.left = x + "px";

        this.parentNode = document.querySelector("#terrain");
        this.parentNode.append(this.node);

    }

    tick(){
        return true;
    }
}
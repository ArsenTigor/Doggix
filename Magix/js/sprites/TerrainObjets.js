export default class TerrainObjets{

    constructor(x, y){

        this.node = document.createElement("div");

        this.random =  Math.floor(Math.random() * 4);

        switch(this.random){
            case 0:
                this.node.classList.add("bush");
                break;
            case 1:
                this.node.classList.add("trunk");
                break;
            case 2:
                this.node.classList.add("flower");
                break;
            case 3:
                this.node.classList.add("tree");
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
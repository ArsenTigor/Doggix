export default class Walker{
    constructor(parentqueryselector, type, facing){

        this.facing = facing;
        this.parentNode = document.querySelector(parentqueryselector);

        this.node = this.node = document.createElement("div");
        this.parentNode.append(this.node);


        if(type == 0){
            this.node.style.width = "300px";
            this.node.style.height = "300px";
            this.node.style.position = "absolute";
            this.node.style.backgroundImage = "url("+ "../Magix/img/walker/walker0.gif" + ")";
            this.node.style.bottom = "150px";
            this.node.style.left = "-10px";
            this.node.style.backgroundSize = "cover"
        }
        else{

        }



    }


}
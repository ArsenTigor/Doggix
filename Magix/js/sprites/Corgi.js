import TiledImage from "../TiledImage.js";

export default class Corgi{
    constructor(parentqueryselector, quotetype) {
        let columnCount = 11;
        let rowCount = 16;
        let refreshDelay = 150; //maison
        let loopColumn = true;
        let scale = 3;


        this.node = document.createElement("div");
        this.node.setAttribute('id', 'corgi');

        this.nodeBubble = document.createElement("div");
        this.nodeBubble.setAttribute('id', 'bubble');
        this.nodeBubble2 = document.createElement("div");
        this.nodeBubble2.setAttribute('id', 'bubble2');
        this.shadow = document.createElement("div");
        this.shadow.setAttribute('id', 'shadowcorgi');

        this.parentNode = document.querySelector(parentqueryselector);
        this.parentNode.append(this.shadow);
        this.parentNode.append(this.node);
        this.parentNode.append(this.nodeBubble);
        this.parentNode.append(this.nodeBubble2);


        this.corgi = new TiledImage("img/corgi.png", columnCount, rowCount, refreshDelay, loopColumn, scale, this.node);
        this.corgi.changeRow(3);
        this.corgi.changeMinMaxInterval(3, 8);
        
        this.x = 50;
        this.y = this.parentNode.offsetHeight - 200;
        this.chasingBall = false;
        this.idle = true;
        this.vitX = 0;
        this.vitY = 0;
        this.targetX = 1000;
        this.targetY = 1000;
        
        this.user = "hooman"
        this.formData = new FormData();
		this.formData.append("username", this.user)
		fetch("ajax.php", {
		method: "POST",
		body: this.formData
		})
		.then(response => response.json())
		.then(result => {
			this.user =  result;
		})

        this.quoteList = []
        this.quoteList.push("woof woof");
        this.quoteList.push("snackos plz");
        this.quoteList.push("bork bork");
        
        if(quotetype == 0){
            this.quoteList.push("throw me the ball");
        }
        else if (quotetype == 1){
            this.quoteList.push("so many fren");
            this.quoteList.push("walkin is best");            
        }

        //delay pour API
        setTimeout(() => {
            this.quoteList.push("<3 " + this.user);

            setInterval(() => {
                let randomText = Math.floor(Math.random() * this.quoteList.length);
                this.nodeBubble.innerText = this.quoteList[randomText];
                this.nodeBubble.style.display = "flex";
                this.nodeBubble2.style.display = "flex";

                setTimeout(() => {
                    this.nodeBubble.style.display = "none";
                    this.nodeBubble2.style.display = "none";
                }, 3000);
                
            }, 10000);

        }, 2000);

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

        this.xbubble = this.x + 100;
        this.ybubble = this.y - 170;
        this.xbubble2 = this.x + 110;
        this.ybubble2 = this.y - 35;
        this.xshadow = this.x + 10;
        this.yshadow = this.y + 80;

        this.nodeBubble.style.top = this.ybubble + "px";
        this.nodeBubble.style.left = this.xbubble + "px";
        this.nodeBubble2.style.top = this.ybubble2 + "px";
        this.nodeBubble2.style.left = this.xbubble2 + "px";
        this.shadow.style.top = this.yshadow + "px";
        this.shadow.style.left = this.xshadow + "px";

        this.corgi.tick(this.x, this.y);
        return true;
    }

    setPos(x, y){
        this.x = x;
        this.y = y;
    }

    getHeight(){
        return this.node.offsetHeight;
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

    idleRand(){
        let idleChoice = Math.floor(Math.random() * 6);
        this.startIdle();
        this.stopChaseBall();
        switch(idleChoice){
            case 0:
                this.idleLeft1();
                break;
            case 1:
                this.idleLeft2();
                break;
            case 2:
                this.idleRight1();
                break;
            case 3:
                this.idleRight2();
                break;
            case 4:
                this.idleSitLeft();
                break;
            case 5:
                this.idleSitRight();
                break;
        }
    }
}
import Cloud from './sprites/Cloud.js';
import Corgi from './sprites/Corgi.js';
import Cloud from './sprites/Cloud.js';
import Tennisball from './sprites/Tennisball.js'
import TerrainObjets from './sprites/TerrainObjets.js'

let spriteList = [];
let ballSpriteList = [];
let terrain = document.querySelector("#terrain");
let maxTennisBall = 10;
let corgi = new Corgi();

window.addEventListener("load", () => {
    let distanceBetweenX = 400;
    let distanceBetweenY = 200;
    let nbrRow = Math.floor((screen.height - terrain.offsetTop)/distanceBetweenY);
    let nbrColumn = Math.floor(screen.width/distanceBetweenX);
    let tempX = 0;
    let tempY = 0;

    for(let i = 0; i < nbrRow*distanceBetweenY - distanceBetweenY; i+=distanceBetweenY){
        for(let j = 0; j < nbrColumn*distanceBetweenX; j+=distanceBetweenX){
            tempX = j + Math.floor(Math.random() * distanceBetweenX);
            tempY = i + Math.floor(Math.random() * distanceBetweenY);
            spriteList.push(new TerrainObjets(tempX, tempY));
        }
    }

    setInterval(() => {
        spriteList.push(new Cloud());
    }, 1000);

    tick();
})

const tick = () => {
    corgi.tick();
	
    for (let i = 0; i < spriteList.length; i++) {
		let alive = spriteList[i].tick();

		if (!alive) {
			spriteList.splice(i, 1);
			i--;
		}
	}

    for (let i = 0; i < ballSpriteList.length; i++) {
		let alive = ballSpriteList[i].tick();

		if (!alive) {
			ballSpriteList.splice(i, 1);
			i--;
		}
	}


    if(ballSpriteList.length > 0){
        if (corgi.getX() == ballSpriteList[0].getX() - 75 && corgi.getY() == ballSpriteList[0].getY() - 75){
            ballSpriteList[0].deleteNode();
            corgi.stopChaseBall();
        }

        if (!corgi.isBallChasing()){
            corgi.chaseBall();
            setTimeout(() => {
                corgi.setSpeed(ballSpriteList[0].getX(), ballSpriteList[0].getY());
            }, 300);
        }
    }
    else{
        if (!corgi.isIdle()){
            let idleChoice = Math.floor(Math.random() * 6);
            switch(idleChoice){
                case 0:
                    corgi.idleLeft1();
                    corgi.startIdle();
                    corgi.stopChaseBall();
                    break;
                case 1:
                    corgi.idleLeft2();
                    corgi.startIdle();
                    corgi.stopChaseBall();
                    break;
                case 2:
                    corgi.idleRight1();
                    corgi.startIdle();
                    corgi.stopChaseBall();
                    break;
                case 3:
                    corgi.idleRight2();
                    corgi.startIdle();
                    corgi.stopChaseBall();
                    break;
                case 4:
                    corgi.idleSitLeft();
                    corgi.startIdle();
                    corgi.stopChaseBall();
                    break;
                case 5:
                    corgi.idleSitRight();
                    corgi.startIdle();
                    corgi.stopChaseBall();
                break;
            }
        }
    }
    window.requestAnimationFrame(tick);
}


terrain.onclick = e => {
    if (e.pageY > terrain.offsetTop){
        if(ballSpriteList.length < maxTennisBall){     
            ballSpriteList.push(new Tennisball(e.pageX, e.pageY));
            corgi.stopIdle();
        }
        else{
            ballSpriteList[0].deleteNode();
            ballSpriteList.push(new Tennisball(e.pageX, e.pageY));
            corgi.stopChaseBall();
        }
    }
}
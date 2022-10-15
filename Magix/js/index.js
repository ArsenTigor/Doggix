import Corgi from './sprites/Corgi.js';
import Tennisball from './sprites/Tennisball.js'

let spriteList = [];
let ballSpriteList = [];
let container = document.querySelector("#terrain");
let maxTennisBall = 10;
let corgi = new Corgi();



window.addEventListener("load", () => {
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

        if(ballSpriteList.length > 0){
            if (corgi.getX() == ballSpriteList[i].getX() - 75 && corgi.getY() == ballSpriteList[i].getY() - 75){
                ballSpriteList[i].deleteNode();
            }
        }
	}









    window.requestAnimationFrame(tick);
}


document.onclick = e => {
    if (e.pageY > container.offsetTop){
        if(ballSpriteList.length < maxTennisBall){
            ballSpriteList.push(new Tennisball(e.pageX, e.pageY));
            corgi.setSpeed(e.pageX -20, e.pageY - 20);

        }
        else{
            ballSpriteList[0].deleteNode();
            ballSpriteList.push(new Tennisball(e.pageX, e.pageY));
        }
    }
}
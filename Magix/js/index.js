import Corgi from './sprites/Corgi.js';
import Tennisball from './sprites/Tennisball.js'

let spriteList = [];
let container = document.querySelector("#terrain");

window.addEventListener("load", () => {
    spriteList.push(new Corgi());
    tick();
})

const tick = () => {
	for (let i = 0; i < spriteList.length; i++) {
		let alive = spriteList[i].tick();

		if (!alive) {
			spriteList.splice(i, 1);
			i--;
		}
	}
    window.requestAnimationFrame(tick);
}

document.onclick = e => {
    if (e.pageY > container.offsetTop){
        spriteList.push(new Tennisball(e.pageX, e.pageY));
    }
    
}
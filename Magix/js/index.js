import Corgi from './sprites/Corgi.js';
import Tennisball from './sprites/Tennisball.js'

let spriteList = [];
let tennisballList = [];
let container = document.querySelector("#terrain");
let maxTennisBall = 10;

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

    for (let i = 0; i < tennisballList.length; i++) {
		let alive = tennisballList[i].tick();

		if (!alive) {
			tennisballList.splice(i, 1);
			i--;
		}
	}
    window.requestAnimationFrame(tick);
}


document.onclick = e => {
    if (e.pageY > container.offsetTop){
        if(tennisballList.length < maxTennisBall){
            tennisballList.push(new Tennisball(e.pageX, e.pageY));
        }
        else{
            tennisballList[0].deleteNode();
            tennisballList.push(new Tennisball(e.pageX, e.pageY));
        }
    }
}
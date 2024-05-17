//Style of chatbox
const applyStyles = iframe => {
	let styles = {
		fontColor : "#333",
		backgroundColor : "rgba(159, 255, 159, 0.8)",
		fontGoogleName : "Press Start 2P",
		fontSize : "16px",
		hideIcons : false,
		inputBackgroundColor :"rgba(100, 255, 100, 0.8)",
		inputFontColor : "black",
		height : "100%",
		width : "100%",
		memberListFontColor : "#ff00dd",
		memberListBackgroundColor : "rgba(128, 128, 128, 0.7)"
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
	}, 100);
}
window.applyStyles = applyStyles;

import Parallax from './sprites/Parallax.js';
import Corgi from './sprites/Corgi.js';
import Walker from './sprites/Walker.js';

let spriteList = [];
let parentNode  = document.querySelector("#bgwalker");
let corgi = new Corgi("#bgwalker", 1);
let mainWalker = new Walker("#bgwalker", 0, "right")
corgi.walkRight();
corgi.setPos(200, parentNode.offsetHeight - corgi.getHeight() - 150);

window.addEventListener("load", () => {
    spriteList.push(new Parallax());

    tick();

	setInterval(() => {
		let type = Math.floor(Math.random() * 20) + 1;
		let direction = "right";

		if (Math.random() < 0.5){
			direction = "right"
		}
		else{
			direction = "left"
		}

		let walker = new Walker("#bgwalker", type, direction);
		spriteList.push(walker);
	}, 1000);


	//Set let session key du user à un localstorage
	let formData = new FormData();
	formData.append("username", "anything")
	fetch("ajax.php", {
	method: "POST",
	body: formData
	})
	.then(response => response.json())
	.then(result => {
		localStorage.setItem("username", result);
	})

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

    window.requestAnimationFrame(tick);
}



let room = [];
let training = document.querySelector("#training");
let pvp = document.querySelector("#pvp");
let arena = document.querySelector("#arena");
let coop = document.querySelector("#coop");
room.push(training);
room.push(pvp);
room.push(arena);
room.push(coop);
room.forEach(element => {
	element.onclick = e => {
		let roomType = element.innerHTML;
		let formData = new FormData();
		formData.append("typeOfRoom", roomType)
		fetch("ajax.php", {
		method: "POST",
		body: formData
		})
		.then(response => response.json())
		.then(result => {
			if(result == "JOINED_TRAINING"){
				console.log("Joining training");
				window.location.href = "./jeu.php"
			}
			if(result == "JOINED_PVP"){
				console.log("Joining pvp");
				window.location.href = "./jeu.php"
			}
			if(result == "CREATED_PVP"){
				console.log("Creating pvp");
				window.location.href = "./jeu.php"
			}
			console.log(result)
		})
	}
});

document.querySelector("#stats").onclick = e => {
   	window.location.href = "./stats.php"
}

document.querySelector("#deck").onclick = e => {
	document.querySelector("#framedeck").style.display = "flex";
}

document.querySelector("#closedeck").onclick = e => {
	document.querySelector("#framedeck").style.display = "none";
}

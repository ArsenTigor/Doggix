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

import Parallax from './sprites/Parallax.js'
import Corgi from './sprites/Corgi.js';




let spriteList = [];
let parentNode  = document.querySelector("#bgwalker");
let corgi = new Corgi("#bgwalker");
corgi.walkRight();
corgi.setPos(150, parentNode.offsetHeight - corgi.getHeight() - 150);

window.addEventListener("load", () => {
    spriteList.push(new Parallax());

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

    window.requestAnimationFrame(tick);
}








































let room = [];
let training = document.querySelector("#training");
let pvp = document.querySelector("#pvp");
room.push(training);
room.push(pvp);
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
				window.location.href = "./jeu.php"
			}
			if(result == "JOINED_PVP"){
				console.log("Joining pvp");
				window.location.href = "./jeu.php"
			}
			if(result == "CREATED_PVP"){
				console.log("creating pvp");
				window.location.href = "./jeu.php"
			}
		})
	}
});




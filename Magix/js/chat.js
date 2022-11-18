const applyStyles = iframe => {
	let styles = {
		fontColor : "#333",
		backgroundColor : "rgba(128, 128, 128, 0.2)",
		fontGoogleName : "Press Start 2P",
		fontSize : "16px",
		hideIcons : false,
		inputBackgroundColor : "red",
		inputFontColor : "blue",
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
				console.log("you made it work? Really?");
				window.location.href = "./jeu.php"
			}
			if(result == "JOINED_PVP"){
				console.log("Joining pvp");
			}
			if(result == "CREATED_PVP"){
				console.log("creating pvp");
			}
		})
	}
});




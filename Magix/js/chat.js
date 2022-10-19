const applyStyles = iframe => {
	let styles = {
		fontColor : "#333",
		backgroundColor : "rgba(87, 41, 5, 0.2)",
		fontGoogleName : "Sofia",
		fontSize : "20px",
		hideIcons : false,
		inputBackgroundColor : "red",
		inputFontColor : "blue",
		height : "100%",
		width : "100%",
		memberListFontColor : "#ff00dd",
		memberListBackgroundColor : "white"
	}
	
	setTimeout(() => {
		iframe.contentWindow.postMessage(JSON.stringify(styles), "*");	
	}, 100);
}
window.applyStyles = applyStyles;

let room = document.querySelectorAll(".roomtype");

room.onclick = e => {
	console.log("HELLO");
	let roomType = e.innerHTML;
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
		}

	})
}



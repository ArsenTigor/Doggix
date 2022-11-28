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

import Card from './jeu/Card.js';
import Field from './jeu/Field.js';

let tabCardPlayer = new Field("playerhand");
let playerBoard = new Field("playerfield");
let opponentBoard = new Field("opponentfield");
let handChanged = false;
let playerFieldChanged = false;
let opponentFieldChanged = false;
let lineList = []
let displaytext = ""
let ennemyQuoteFetched = false;
let tauntPresent = false;
let tauntDetected = false;
let chatboxOpen = false;

lineList.push("HELP!!!!!!!")
lineList.push("GET ME DOWN!!!!")
lineList.push("T_T!!!!!!!")
lineList.push("GO AWAYYYY!!!")
lineList.push("I'M ALLERGIC TO YOU!!!")
lineList.push("LEAVE ME ALONE!!!!")


let attackUID = -1;
let targetUID = -1;


const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
 method : "POST"        // l’API (games/state)
    })
.then(response => response.json())
.then(data => {
    // console.log(data); // contient les cartes/état du jeu.



    document.querySelector("#opponentavatar").style.width = document.querySelector("#opponentavatar").offsetHeight + "px";

    if(data == "WAITING"){
        document.querySelector("#waiting").style.display = "flex";
    }
    else if(data == "LAST_GAME_WON"){
        document.querySelector("#gamewon").style.display = "flex";
        setTimeout(() => {
            window.location.href = "./chat.php"
        }, 5000);
    }
    else if(data == "LAST_GAME_LOST"){
        document.querySelector("#gamelost").style.display = "flex";
        setTimeout(() => {
            window.location.href = "./chat.php"
        }, 5000);
    }
    else {

        if(ennemyQuoteFetched == false){
            ennemyQuoteFetched = true;
            lineList.push(data.opponent.welcomeText + "!!!")
        }
        
        document.querySelector("#waiting").style.display = "none";
        document.querySelector("#gamelost").style.display = "none";
        document.querySelector("#gamewon").style.display = "none";

        document.querySelector("#playerlife").innerHTML = data.hp;
        document.querySelector("#playerenergy").innerHTML = data.mp;
        document.querySelector("#playercardleft").innerHTML = "Cardleft<br>" + data.remainingCardsCount;
        document.querySelector("#opponentlife").innerHTML = data.opponent.hp;
        document.querySelector("#opponentenergy").innerHTML = data.opponent.mp;
        document.querySelector("#opponentcardleft").innerHTML = data.opponent.handSize;
        document.querySelector("#opponentname").innerHTML = data.opponent.username;
        document.querySelector("#opponentclass").innerHTML = data.opponent.talent + " " + data.opponent.heroClass;
        document.querySelector("#timer").innerHTML = data.remainingTurnTime;
        if(data.yourTurn == false){
            document.querySelector("#currentplayer").innerHTML = data.opponent.username + "'s<br>turn";
            unglowUnselect();
        }
        else{
            let user = ""
            let formData = new FormData();
            formData.append("username", user)
            fetch("ajax.php", {
            method: "POST",
            body: formData
            })
            .then(response => response.json())
            .then(result => {
                document.querySelector("#currentplayer").innerHTML =  result + "'s<br>turn";
            })
        }

        if (data.heroPowerAlreadyUsed == true){
            document.querySelector("#heropower").style.opacity = "0.5"
        }
        else {
            document.querySelector("#heropower").style.opacity = "1"
        }
        
        //HAND
        data.hand.forEach(e => {
            if(tabCardPlayer.isNewCard(e.uid)){
                let card =  new Card(e)
                tabCardPlayer.addCard(card)
                handChanged = true;
            }
        });
        if (tabCardPlayer.isFieldSizeChanged(data.hand)){ 
            handChanged = true;
        }

        if (handChanged == true){
            handChanged = false;
            tabCardPlayer.updateField();
        } 
        else{
            tabCardPlayer.updateStatsCardsInField(data.hand);
        }

        //PLAYERFIELD
        data.board.forEach(e => {
            if(playerBoard.isNewCard(e.uid)){
                let card =  new Card(e)
                playerBoard.addCard(card)
                playerFieldChanged = true;
            }
        });

        if (playerBoard.isFieldSizeChanged(data.board)){ 
            playerFieldChanged = true;
        }

        if (playerFieldChanged == true){
            playerFieldChanged = false;
            playerBoard.updateField();
        } 
        else{
            playerBoard.updateStatsCardsInField(data.board);
        }

        //OPPONENTFIELD
        data.opponent.board.forEach(e => {
            if(opponentBoard.isNewCard(e.uid)){
                let card =  new Card(e)
                opponentBoard.addCard(card)
                opponentFieldChanged = true;
            }
        });

        if (opponentBoard.isFieldSizeChanged(data.opponent.board)){ 
            opponentFieldChanged = true;
        }

        if (opponentFieldChanged == true){
            opponentFieldChanged = false;
            opponentBoard.updateField();
        } 
        else{
            opponentBoard.updateStatsCardsInField(data.opponent.board);
        }

        //ON CLICK FOR ALL CARDS
        //To play card
        tabCardPlayer.field.forEach(element => {
            element.card.onclick = e => {
                let formData = new FormData();
                formData.append("game", "play")
                formData.append("gameUID", element.uid)
                // console.log(element.id);
                formData.append("gameID", element.id)
                fetch("ajax-jeu.php", {
                    method: "POST",
                    body: formData
                })
                .then(response => response.json())
                .then(result => {
                    error(result);
                })
                unglowUnselect();
            }
        });

        //Selecting Attacker
        playerBoard.field.forEach(element => {
            element.card.onclick = e => {
                // console.log("CLICKED ON PLAYER CARD")
                element.card.classList.add("glow")
                attackUID = element.uid;
            }
        });
        
        //Selecting Target
        opponentBoard.field.forEach(element => {
            element.card.onclick = e => {
                // console.log("CLICKED ON OPPOENENT CARD")
                targetUID = element.uid;
            }
        });

        //API call to attack
        if (targetUID != -1 && attackUID != -1){
            let formData = new FormData();
            formData.append("game", "attack")
            formData.append("gameUID", attackUID)
            formData.append("gameTarget", targetUID)
            fetch("ajax-jeu.php", {
            method: "POST",
            body: formData
            })
            .then(response => response.json())
            .then(result => {
                error(result);
            })
            unglowUnselect();
        }


        //SPECIAL EFFECT ON CARDS
        //Sleep
        playerBoard.field.forEach(element => {
            if(element.data.state == "SLEEP"){
                element.card.classList.add("greyed")
            }
        });
        opponentBoard.field.forEach(element => {
            if(element.data.state == "SLEEP"){
                element.card.classList.add("greyed")
            }
        });

        //Idle
        playerBoard.field.forEach(element => {
            if(element.data.state == "IDLE"){
                element.card.classList.remove("greyed")
            }
        });
        opponentBoard.field.forEach(element => {
            if(element.data.state == "IDLE"){
                element.card.classList.remove("greyed")
            }
        });

        //Taunt
        opponentBoard.field.forEach(element => {
            if(element.data.mechanics.includes("Taunt")){
                tauntPresent = true;
                tauntDetected = true;
            }else{
                if (tauntDetected == false){
                      tauntPresent = false;
                }
            }
        });
        if(tauntPresent == true){
            tauntDetected = false;
            tauntPresent = false;
            opponentBoard.field.forEach(element => {
                if(!element.data.mechanics.includes("Taunt")){
                    element.card.classList.add("greyed")
                }
            });
        }
        
        //Stealth
        opponentBoard.field.forEach(element => {
            if(element.data.mechanics.includes("Stealth")){
                element.card.classList.add("greyed")
            }
        });
    }


    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })

}

document.querySelector("#endturn").onclick = e => {
    let formData = new FormData();
    formData.append("menu", "endturn")
    fetch("ajax-jeu.php", {
    method: "POST",
    body: formData
    })
    .then(response => response.json())
    .then(result => {
        error(result);
    })
}

document.querySelector("#surrender").onclick = e => {
    let formData = new FormData();
    formData.append("menu", "surrender")
    fetch("ajax-jeu.php", {
    method: "POST",
    body: formData
    })
    .then(response => response.json())
    .then(result => {
        error(result);
    })
}

document.querySelector("#heropower").onclick = e => {
    unglowUnselect();
    let formData = new FormData();
    formData.append("menu", "heropower")
    fetch("ajax-jeu.php", {
    method: "POST",
    body: formData
    })
    .then(response => response.json())
    .then(result => {
        error(result);
    })
}

document.querySelector("#opponentavatar").onclick = e => {
    targetUID = 0;
}

document.querySelector("#togglechat").onclick = e => {
    if (chatboxOpen == false){
        chatboxOpen = true;
        document.querySelector("#chatboxcontainer").style.display = "block";
    }else{
        chatboxOpen = false;
        document.querySelector("#chatboxcontainer").style.display = "none";
    }
}


window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
    newQuote();
});

const newQuote = () => {
    let quote = Math.floor(Math.random() * lineList.length);
    let currentline = lineList[quote];
    let displaytext = "";
    let textspeed = 500

    for (let i = 0; i < currentline.length; i++) {
        setTimeout(() => {
            displaytext +=currentline.charAt(i);
            document.querySelector("#extrawindow1").innerHTML = displaytext;
            if (i == currentline.length - 1){
                setTimeout(() => {
                    newQuote();
                }, 3000)
            }
        }, textspeed * (i))
    }
}

const error = (errorMessage) => {
    if (errorMessage == "INVALID_ACTION"){
        document.querySelector("#extrawindow2").innerHTML  = "Action invalide"
    }else if(errorMessage == "ACTION_IS_NOT_AN_OBJECT"){
        document.querySelector("#extrawindow2").innerHTML  = "Mauvaise structure de données"
    }else if(errorMessage == "NOT_ENOUGH_ENERGY"){
        document.querySelector("#extrawindow2").innerHTML  = "La carte coûte trop cher à jouer"
    }else if(errorMessage == "BOARD_IS_FULL "){
        document.querySelector("#extrawindow2").innerHTML  = "Pas assez de place pour la carte"
    }else if(errorMessage == "CARD_NOT_IN_HAND"){
        document.querySelector("#extrawindow2").innerHTML  = "La carte n’est pas dans votre main"
    }else if(errorMessage == "CARD_IS_SLEEPING"){
        document.querySelector("#extrawindow2").innerHTML  = "Carte ne peut être jouée ce tour-ci"
    }else if(errorMessage == "MUST_ATTACK_TAUNT_FIRST"){
        document.querySelector("#extrawindow2").innerHTML  = "Une carte taunt empêche ce coup"
    }else if(errorMessage == "OPPONENT_CARD_NOT_FOUND"){
        document.querySelector("#extrawindow2").innerHTML  = "La carte attaquée n’est pas présente sur le jeu"
    }else if(errorMessage == "OPPONENT_CARD_HAS_STEALTH"){
        document.querySelector("#extrawindow2").innerHTML  = "La carte ne peut être attaquée directement tant qu’elle possède « stealth »"
    }else if(errorMessage == "CARD_NOT_FOUND"){
        document.querySelector("#extrawindow2").innerHTML  = "La carte cherchée (uid) n’est pas présente"
    }else if(errorMessage == "ERROR_PROCESSING_ACTION"){
        document.querySelector("#extrawindow2").innerHTML  = "Erreur interne, ne devrait pas se produire"
    }else if(errorMessage == "INTERNAL_ACTION_ERROR"){
        document.querySelector("#extrawindow2").innerHTML  = "Erreur interne, ne devrait pas se produire"
    }else if(errorMessage == "HERO_POWER_ALREADY_USED"){
        document.querySelector("#extrawindow2").innerHTML  = "Pouvoir déjà utilisé pour ce tour"
    }

    setTimeout(() => {
        document.querySelector("#extrawindow2").innerHTML  = ""
    }, 5000);
}

const unglowUnselect = () => {
    attackUID = -1;
    targetUID = -1;
    opponentBoard.field.forEach(element => {
        element.card.classList.remove("glow")
    });
    playerBoard.field.forEach(element => {
        element.card.classList.remove("glow")
    });
}


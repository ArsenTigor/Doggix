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
    console.log(data); // contient les cartes/état du jeu.



    document.querySelector("#opponentavatar").style.width = document.querySelector("#opponentavatar").offsetHeight + "px";

    if(data == "WAITING"){
        document.querySelector("#waiting").style.display = "flex";
    }
    else if(data == "LAST_GAME_WON"){
        document.querySelector("#gamewon").style.display = "flex";
    }
    else if(data == "LAST_GAME_LOST"){
        document.querySelector("#gamelost").style.display = "flex";
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
            attackUID = -1;
            targetUID = -1;
            opponentBoard.field.forEach(element => {
                element.card.classList.remove("glow")
            });
            playerBoard.field.forEach(element => {
                element.card.classList.remove("glow")
            });
            
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
                fetch("ajax-jeu.php", {
                method: "POST",
                body: formData
                })
                .then(response => response.json())
                .then(result => {
                    //ERROR MESSAGE INTO EXTRA2
                })
            }
        });

        //Selecting Attacker
        playerBoard.field.forEach(element => {
            element.card.onclick = e => {
                console.log("CLICKED ON PLAYER CARD")
                element.card.classList.add("glow")
                attackUID = element.uid;
            }
        });
        
        //Selecting Target
        opponentBoard.field.forEach(element => {
            element.card.onclick = e => {
                console.log("CLICKED ON OPPOENENT CARD")
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
                //ERROR MESSAGE INTO EXTRA2
            })

            playerBoard.field.forEach(element => {
                element.card.classList.remove("glow")
            });

            targetUID = -1
            attackUID = -1
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
            }else{
                tauntPresent = false;
            }
        });
        if(tauntPresent == true){
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
    })
}

document.querySelector("#heropower").onclick = e => {
    let formData = new FormData();
    formData.append("menu", "heropower")
    fetch("ajax-jeu.php", {
    method: "POST",
    body: formData
    })
    .then(response => response.json())
    .then(result => {
    })
}

document.querySelector("#opponentavatar").onclick = e => {
    targetUID = 0;
    console.log("HELLO?")
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



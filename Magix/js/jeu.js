import Card from './jeu/Card.js';
import Field from './jeu/Field.js'

let tabCardPlayer = new Field("playerhand");
let playerBoard = new Field("playerfield");
let opponentBoard = new Field("opponentfield");
let handChanged = false;
let playerFieldChanged = false;
let opponentFieldChanged = false;


let attackUID = -1;
let targetUID = -1;


const state = () => {
    fetch("ajax-state.php", {   // Il faut créer cette page et son contrôleur appelle 
 method : "POST"        // l’API (games/state)
    })
.then(response => response.json())
.then(data => {
    console.log(data); // contient les cartes/état du jeu.

    if(data != "WAITING" && data != "LAST_GAME_WON" && data != "LAST_GAME_LOST"){
        document.querySelector("#playerlife").innerHTML = data.hp;
        document.querySelector("#playerenergy").innerHTML = data.mp;
        document.querySelector("#playercardleft").innerHTML = data.hand.length;
        document.querySelector("#opponentlife").innerHTML = data.opponent.hp;
        document.querySelector("#opponentenergy").innerHTML = data.opponent.mp;
        document.querySelector("#opponentcardleft").innerHTML = data.opponent.remainingCardsCount;
        document.querySelector("#opponentname").innerHTML = data.opponent.username;
        document.querySelector("#opponentclass").innerHTML = data.opponent.heroClass;
        document.querySelector("#timer").innerHTML = data.remainingTurnTime;
        


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
                    console.log(result)
                })
            }
        });

        playerBoard.field.forEach(element => {
            element.card.onclick = e => {
                ///////Attacker
                console.log("CLICKED ON PLAYER CARD")
                element.card.classList.add("glow")
                attackUID = element.uid;
            }
        });
        
        opponentBoard.field.forEach(element => {
            element.card.onclick = e => {
                ///////Attacked
                console.log("CLICKED ON OPPOENENT CARD")
                element.card.classList.add("glow")
                targetUID = element.uid;
            }
        });


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
                console.log(result)
            })


            targetUID = -1
            attackUID = -1
        }



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
});





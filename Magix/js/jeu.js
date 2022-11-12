import Card from './jeu/Card.js';
import Hand from './jeu/Hand.js';
import Field from './jeu/Field.js'

let tabCardPlayer = new Hand();
let playerBoard = new Field("playerfield");
let opponentBoard = new Field("opponentfield");
let handChanged = false;
let playerFieldChanged = false;
let opponentFieldChanged = false;
let nodeOpponentField = document.querySelector("#opponentfield");
let nodePlayerField = document.querySelector("#playerfield");
let playUID = -1;
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


        //Update les cartes sur les board
        // playerBoard = data.board;
        // opponentBoard = data.opponent.board;
        // nodePlayerField.innerHTML = "";
        // nodeOpponentField.innerHTML = "";
        // playerBoard.forEach(e => {
        //     let card = new Card(e)
        //     nodePlayerField.append(card.card)
        //     card.card.onclick = e => {
        //         /////////Ajouter call api pour attack
        //     }
        // });
        // opponentBoard.forEach(e => {
        //     let card = new Card(e)
        //     nodeOpponentField.append(card.card)
        // });


        //Pige de carte
        data.hand.forEach(e => {
            if(tabCardPlayer.isNewCard(e.uid)){
                let card =  new Card(e)
                tabCardPlayer.addCard(card)
                handChanged = true;
            }
        });


        //En cas de discard de l'opponent
        if (tabCardPlayer.isHandSizeChanged(data.hand)){ 
            handChanged = true;
        }

        //Update la main s'il y a eut des changement
        if (handChanged == true){
            handChanged = false;
            tabCardPlayer.updateHand();
        } 
        else{
            tabCardPlayer.updateStatsCardsInHand(data.hand);
        }


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



        tabCardPlayer.hand.forEach(element => {
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
                this.card.classList.add("glow")
            }

            attackUID = element.uid;

        });
        
        opponentBoard.field.forEach(element => {
            element.card.onclick = e => {
                ///////Attacked
                console.log("CLICKED ON OPPOENENT CARD")
                
            }
            
            targetUID = element.uid;

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





window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
});



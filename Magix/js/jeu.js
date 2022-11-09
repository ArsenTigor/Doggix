import Card from './jeu/Card.js';
import Hand from './jeu/Hand.js';

let tabCardPlayer = new Hand();
let handChanged = false;
let playerBoard = [];
let opponentBoard = [];
let nodeOpponentField = document.querySelector("#opponentfield");
let nodePlayerField = document.querySelector("#playerfield");

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
        playerBoard = data.board;
        opponentBoard = data.opponent.board;
        nodePlayerField.innerHTML = "";
        nodeOpponentField.innerHTML = "";
        playerBoard.forEach(e => {
            card = new Card(e)
            nodePlayerField.append(card.card)
        });
        opponentBoard.forEach(e => {
            let card = new Card(e)
            nodeOpponentField.append(card.card)
        });

        //Pige de carte
        data.hand.forEach(e => {
            if(tabCardPlayer.isNewCard(e.uid)){
                tabCardPlayer.addCard(new Card(e))
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
    }


    setTimeout(state, 1000); // Attendre 1 seconde avant de relancer l’appel
    })
}

window.addEventListener("load", () => {
    setTimeout(state, 1000); // Appel initial (attendre 1 seconde)
    tick();
});

const tick = () => {
    document.querySelector("#playerhand")

    window.requestAnimationFrame(tick);
}


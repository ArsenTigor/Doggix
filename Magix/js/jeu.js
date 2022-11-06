import Card from './jeu/Card.js';
import Hand from './jeu/Hand.js';

let tabCardPlayer = new Hand();
let playerBoard = [];
let opponentBoard = [];

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
    }

    let test = new Card(data);

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


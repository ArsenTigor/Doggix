import Card from "./Card";

export default class Hand {
    constructor(){
        this.hand = [];
        this.parentNode = document.querySelector("#playerhand");

    }

    addCard(card){
        this.hand.push(card);
    }

    isNewCard(cardId){
        let newCard = true;

        if (this.hand.length > 0){
            this.hand.forEach(e => {
                if(e.uid == cardId){
                    newCard = false;
                } 
            });
        }
        return newCard;
    }

    isHandSizeChanged(handapi){
        if(this.hand.length == handapi.length){
            return false;
        }
        else {
            this.hand = []
            handapi.forEach(element => {
                this.addCard(new Card(element, "hand"));
            });
            return true;
        }
    }

    updateStatsCardsInHand(handapi){
        this.hand.forEach(eHand => {
            handapi.forEach(eApi => {
                if(eHand.uid == eApi.uid){
                    eHand.hp = eApi.hp;
                    eHand.cost = eApi.cost;
                    eHand.atk = eApi.atk;
                }
            });
        });
    }


    updateHand(){
        this.parentNode.innerHTML = "";
        this.hand.forEach(e => {
            this.parentNode.append(e.card)
        });
    }


    tick(){

    }
}
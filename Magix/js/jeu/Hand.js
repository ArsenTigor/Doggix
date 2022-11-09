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
                this.addCard(element);
            });
            return true;
        }
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
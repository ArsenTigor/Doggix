import Card from './Card.js'

export default class Hand {
    constructor(typeOfField){
        this.field = [];
        this.type = typeOfField;

        let fieldQuerySelector = "#" + this.type;
        this.parentNode = document.querySelector(fieldQuerySelector);

    }

    addCard(card){
        this.field.push(card);
    }

    isNewCard(cardId){
        let newCard = true;

        if (this.field.length > 0){
            this.field.forEach(e => {
                if(e.uid == cardId){
                    newCard = false;
                } 
            });
        }
        return newCard;
    }

    isFieldSizeChanged(api){
        if(this.field.length == api.length){
            return false;
        }
        else {
            this.field = []
            api.forEach(element => {
                this.addCard(new Card(element));
            });
            return true;
        }
    }

    updateStatsCardsInField(api){
        this.field.forEach(card => {
            api.forEach(eApi => {
                if(card.uid == eApi.uid){
                    card.hp.innerHTML = eApi.hp;
                    card.cost.innerHTML = eApi.cost;
                    card.atk.innerHTML = eApi.atk;
                }
            });
        });
    }

    updateField(){
        this.parentNode.innerHTML = "";
        this.field.forEach(e => {
            this.parentNode.append(e.card)
        });
    }




    tick(){

    }
}
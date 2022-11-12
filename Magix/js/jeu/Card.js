export default class Card {
    constructor(data){
        this.data = data;

        this.uid = this.data.uid;

        this.card = document.createElement("div");
        this.card.classList.add("card");

        this.cardTop = document.createElement("div");
        this.cardTop.classList.add("cardimage")

        this.cardBottom = document.createElement("div");
        this.cardBottom.classList.add("carddesciption");

        this.cardStats = document.createElement("div")
        this.cardStats.classList.add("cardstats")

        this.cost = document.createElement("div");
        this.cost.classList.add("cardcost");
        this.atk = document.createElement("div");
        this.atk.classList.add("cardattack");
        this.hp = document.createElement("div");
        this.hp.classList.add("cardlife");

        this.card.append(this.cardTop);
        this.card.append(this.cardBottom);

        this.cardStats.append(this.cost);
        this.cardStats.append(this.atk);
        this.cardStats.append(this.hp);

        this.cardTop.append(this.cardStats)

        this.cost.innerHTML = data.cost;
        this.hp.innerHTML = data.hp;
        this.atk.innerHTML = data.atk;

    }

    removeMe(){
        this.card.remove();
    }


    tick(){

    }


}
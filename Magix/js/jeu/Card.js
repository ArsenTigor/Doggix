export default class Card {
    constructor(data){
        this.data = data;

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
        this.attack = document.createElement("div");
        this.attack.classList.add("cardattack");
        this.life = document.createElement("div");
        this.life.classList.add("cardlife");

        this.card.append(this.cardTop);
        this.card.append(this.cardBottom);

        this.cardStats.append(this.cost);
        this.cardStats.append(this.attack);
        this.cardStats.append(this.life);

        this.cardTop.append(this.cardStats)

        //testing
        this.cost.innerHTML = "10";
        this.life.innerHTML = "10";
        this.attack.innerHTML = "10";

        this.test = document.querySelector("#playerhand");
        this.test.append(this.card);

    }

    displayCard(){

    }


    tick(){

    }
}
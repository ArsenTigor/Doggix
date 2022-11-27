export default class Card {
    constructor(data){
        this.data = data;

        this.uid = this.data.uid;
        this.id = this.data.id;

        this.card = document.createElement("div");
        this.card.classList.add("card");

        this.cardTop = document.createElement("div");
        this.cardTop.classList.add("cardimage");
        // this.cardTop.style.backgroundColor = "rgb(159, 255, 159)";


        this.cardBottomContainer = document.createElement("div");
        this.cardBottomContainer.classList.add("carddesciptioncontain");
        

        this.cardBottom = document.createElement("div");
        this.cardBottom.classList.add("carddesciption");
        this.cardBottom.style.backgroundColor = "rgba(100, 255, 100)";
        this.cardBottom.style.overflow = "hidden";

        this.cardStats = document.createElement("div")
        this.cardStats.classList.add("cardstats")

        this.cost = document.createElement("div");
        this.cost.classList.add("cardcost");
        this.atk = document.createElement("div");
        this.atk.classList.add("cardattack");
        this.hp = document.createElement("div");
        this.hp.classList.add("cardlife");

        this.card.append(this.cardTop);
        this.card.append(this.cardBottomContainer);

        this.cardStats.append(this.cost);
        this.cardStats.append(this.atk);
        this.cardStats.append(this.hp);

        this.cardTop.append(this.cardStats);
        this.cardBottomContainer.append(this.cardBottom);

        this.cardEffects = document.createElement("div");
        this.cardEffects.classList.add("cardeffects");


        this.updateCardData(this.data);

        this.cardTop.append(this.cardEffects);

        if(this.data.cost <= 10 && this.data.cost >= 1){
            this.cardTop.style.backgroundImage = "url("+ "../Magix/img/card/" + String(this.data.cost) + ".png" + ")";
        }
        else{
            this.cardTop.style.backgroundImage = "url("+ "../Magix/img/card/other.gif" + ")";
        }
    }

    updateCardData(data){
        this.data = data;
        this.cost.innerHTML = data.cost;
        this.hp.innerHTML = data.hp;
        this.atk.innerHTML = data.atk;
        this.mechanics = "";
        this.data.mechanics.forEach(element => {
            this.mechanics += element;
            this.mechanics += "<br><br>"
        });
        this.cardBottom.innerHTML = this.mechanics;

        this.cardEffects.innerHTML = "";
        if(this.data.mechanics.includes("Taunt")){
            this.tauntIcon = document.createElement("div");
            this.tauntIcon.classList.add("taunt");
            this.cardEffects.append(this.tauntIcon)
        }

        if(this.data.mechanics.includes("Stealth")){
            this.stealthIcon = document.createElement("div");
            this.stealthIcon.classList.add("stealth");
            this.cardEffects.append(this.stealthIcon)
        }

        if(this.data.mechanics.includes("Confused")){
            this.confusedIcon = document.createElement("div");
            this.confusedIcon.classList.add("confused");
            this.cardEffects.append(this.confusedIcon)
        }

        if(this.data.mechanics.includes("Charge")){
            this.chargeIcon = document.createElement("div");
            this.chargeIcon.classList.add("charge");
            this.cardEffects.append(this.chargeIcon)
        }

        if(this.data.mechanics.includes("Cannot attack")){
            this.cannotatkIcon = document.createElement("div");
            this.cannotatkIcon.classList.add("cannotattack");
            this.cardEffects.append(this.cannotatkIcon)
        }

        this.tempString = ""
        this.data.mechanics.forEach(element => {
            this.tempString += element;
        });
        if(this.tempString.includes("Battlecry")){
            this.battlecryIcon = document.createElement("div");
            this.battlecryIcon.classList.add("battlecry");
            this.cardEffects.append(this.battlecryIcon)
        }

        this.tempString = ""
        this.data.mechanics.forEach(element => {
            this.tempString += element;
        });
        if(this.tempString.includes("Deathrattle :")){
            this.deathrattleIcon = document.createElement("div");
            this.deathrattleIcon.classList.add("deathrattle");
            this.cardEffects.append(this.deathrattleIcon)
        }
    }
}
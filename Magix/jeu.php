<?php

    require_once("action/JeuAction.php");

    

    $action = new JeuAction();
    $data = $action->execute();
    $pageName = "jeu";

    require_once("partial/header.php");
?>

    <div id="waiting">WAITING</div>
    <div id="gamewon">YOU WON</div>
    <div id="gamelost">YOU LOST</div>

<div id="conteneurmain">
    
    <div id="opponentzone">
        <div class="stats">
            <div id="opponentlife">LIFE</div>
            <div id="opponentenergy">ENERGY </div>
            <div id="opponentcardleft">CARD LEFT</div>
        </div>

        <div id="opponentavatar"></div>

        <div class="stats2">
            <div id="opponentname">OPPONENT NAME</div>
            <div id="opponentclass">OPPONENT CLASS</div>
        </div>
    </div>


    <div id="zone">
        <div id="leftplayzone">
            <div id="playercardleft"> PLAYER CARD LEFT</div>
            <div id="deckpile"></div>
        </div>
        
        <div id="opponentfield" class="cardzone"></div>
        
        <div id="spacer1"></div>
        
        <div id="playerfield" class="cardzone"></div>
        
        <div id="rightplayzone">
            <div id="currentplayer"></div>
            <div class="timeranimation"></div>
            <div id="timer"></div>
        </div>
        
        <div id="spacer2"></div>
    
        <div class="stats">
            <div id="playerlife">LIFE</div>
            <div id="playerenergy">ENERGY </div>
        </div>

        <div id="playerhand" class="cardzone"></div>
        
        <div id="menu">
            <div id="heropower"></div>
            <div id="endturn"></div>
            <div id="surrender">Surrender</div>
        </div>
    </div>

</div>





<?php
    require_once("partial/footer.php");
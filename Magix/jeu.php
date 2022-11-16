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

<div id="backgroundtree"></div>

<div id="conteneurmain">
    <div id="backgroundground"></div>
    <div id="backgroundsky"></div>
        
    <div id="opponentzone">
        <div class="stats2">
            <div id="opponentname">OPPONENT NAME</div>
            <div id="opponentclass">OPPONENT CLASS</div>
        </div>

        <div class="stats2">
            <div id="opponentlife">LIFE</div>
            <div id="opponentenergy">ENERGY </div>
            <div id="opponentcardleft">CARD LEFT</div>
        </div>

        <div id="opponentavatar"></div>

        <div id="extrawindow1">Add some enemy quote here</div>
        <div id="extrawindow2">Add API reply to not good command</div>


    </div>


    <div id="zone">
        <div id="leftplayzone">
            <div id="playercardleft"> PLAYER CARD LEFT</div>
            <div id="deckpile"></div>
        </div>
        
     
        
        <div id="rightplayzone">
            <div id="currentplayer"></div>
            <div class="timeranimation"></div>
            <div id="timer"></div>
        </div>
    
        <div class="stats">
            <div id="playerlife">LIFE</div>
            <div id="playerenergy">ENERGY </div>
        </div>

        <div id="middlesection">
            <div id="opponentfield" class="cardzone"></div>
            
            <div id="playerfield" class="cardzone"></div>

            <div id="playerhand" class="cardzone"></div>
        </div>
        
        <div id="menu">
            <div id="heropower"></div>
            <div id="endturn"></div>
            <div id="surrender"></div>
        </div>
    </div>

</div>





<?php
    require_once("partial/footer.php");
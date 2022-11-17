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
<div id="backgroundground"></div>
<div id="backgroundsky"></div>

<div id="conteneurmain">
        
    <div id="opponentzone" class="flexcenter">
        <div class="stats2 flexspacearound">
            <div id="opponentname">OPPONENT NAME</div>
            <div id="opponentclass">OPPONENT CLASS</div>
        </div>

        <div class="stats3 flexspacearound">
            <div id="opponentcardleft" class="flexcenter backgroundcenter" >CARD LEFT</div>
            <div id="opponentenergy" class="flexcenter backgroundcenter ">ENERGY </div>
            <div id="opponentlife" class="flexcenter backgroundcenter" >LIFE</div>
        </div>

        <div class="backgroundcenter" id="opponentavatar"></div>

        <div id="extrawindow1" class="flexcenter"></div>
        <div id="extrawindow2">Add API reply to not good command</div>


    </div>


    <div id="zone">
        <div id="leftplayzone" class="flexspacearound">
            <div id="playercardleft" class="flexspacearound"> PLAYER CARD LEFT</div>
            <div id="deckpile" class="backgroundcenter"></div>
        </div>
        
     
        
        <div id="rightplayzone">
            <div id="currentplayer" class="flexcenter" ></div>
            <div class="timeranimation flexcenter backgroundcenter"></div>
            <div id="timer" class="flexcenter" ></div>
        </div>
    
        <div class="stats flexspacearound">
            <div id="playerenergy">ENERGY </div>
            <div id="playerlife">LIFE</div>
        </div>

        <div id="middlesection" class="flexspacearound">
            <div id="opponentfield" class="cardzone flexcenter"></div>
            
            <div id="playerfield" class="cardzone flexcenter"></div>

            <div id="playerhand" class="cardzone flexcenter"></div>
        </div>
        
        <div id="menu" class="flexspacearound">
            <div id="heropower"></div>
            <div id="endturn"></div>
            <div id="surrender"></div>
        </div>
    </div>

</div>





<?php
    require_once("partial/footer.php");
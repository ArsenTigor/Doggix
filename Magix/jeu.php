<?php

    require_once("action/JeuAction.php");

    $action = new JeuAction();
    $data = $action->execute();
    $pageName = "jeu";

    require_once("partial/header.php");
?>

<div id=togglechat class="cursor" ></div>
<div id="chatboxcontainer">

    <iframe style="width:100%;height:90%;" onload="applyStyles(this)" 
    src="https://magix.apps-de-cours.com/server/#/chat/<?=$data["key"]?>/large">
    </iframe>

</div>

<div id="waiting"></div>
<div id="gamewon"></div>
<div id="gamelost"></div>

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

        <div class="backgroundcenter cursor" id="opponentavatar"></div>

        <div id="extrawindow1" class="flexcenter"></div>
        <div id="extrawindow2" class="flexcenter"></div>

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
            <div id="heropower" class="cursor"></div>
            <div id="endturn" class="cursor"></div>
            <div id="surrender" class="cursor"></div>
        </div>
    </div>

</div>





<?php
    require_once("partial/footer.php");
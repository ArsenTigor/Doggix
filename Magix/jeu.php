<?php

    require_once("action/JeuAction.php");

    

    $action = new JeuAction();
    $data = $action->execute();
    $pageName = "jeu";

    require_once("partial/header.php");
?>

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

    <div id="playzone">
        <div id="leftplayzone">TIMER</div>
        <div id="opponentfield" class="cardzone">
            <div class="card">TEST</div>
        </div>
        <div id="playerfield" class="cardzone">
            <div class="card">TEST</div>
        </div>
        <div id="rightplayzone">TIMER</div>
    </div>

    <div id="playerzone">
        <div class="stats">
            <div id="playerlife">LIFE</div>
            <div id="playerenergy">ENERGY </div>
            <div id="playercardleft">CARD LEFT</div>
        </div>
        <div id="playerhand" class="cardzone">
            <div class="card">
                <div class="cardimage"></div>
                <div class="carddesciption"></div>
                <div></div>
            </div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
            <div class="card"></div>
        </div>
        <div id="menu">
            <div>Hero Power</div>
            <div>End turn</div>
        </div>
    </div>

</div>





<?php
    require_once("partial/footer.php");
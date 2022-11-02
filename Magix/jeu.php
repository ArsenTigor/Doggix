<?php

    require_once("action/JeuAction.php");

    

    $action = new JeuAction();
    $data = $action->execute();
    $pageName = "jeu";

    require_once("partial/header.php");
?>

<div id="conteneurmain">

    <div id="opponentzone">
        <div class="stats"></div>
        <div id="opponentavatar"></div>
        <div></div>
    </div>

    <div id="playzone">
        <div id="leftplayzone">TIMER</div>
        <div id="opponentfield" class="cardzone">
            <div class="card">TEST</div>
            <div class="card">TEST</div>
            <div class="card">TEST</div>
            <div class="card">TEST</div>
            <div class="card">TEST</div>
        </div>
        <div id="playerfield" class="cardzone">
            <div class="card">TEST</div>
            <div class="card">TEST</div>
            <div class="card">TEST</div>
            <div class="card">TEST</div>
            <div class="card">TEST</div>
        </div>
        <div id="rightplayzone">TIMER</div>
    </div>

    <div id="playerzone">
        <div class="stats">
            <div class="life">LIFE</div>
            <div class="energy"> </div>
            <div class="cardleft"></div>
        </div>
        <div id="playerhand" class="cardzone">
            <div class="card">TEST</div>
            <div class="card">TEST</div>
            <div class="card">TEST</div>
            <div class="card">TEST</div>
            <div class="card">TEST</div>
            <div class="card">TEST</div>
            <div class="card">TEST</div>
            <div class="card">TEST</div>
        </div>
        <div id="menu">
            <div>Hero Power</div>
            <div>End turn</div>
        </div>
    </div>

</div>





<?php
    require_once("partial/footer.php");
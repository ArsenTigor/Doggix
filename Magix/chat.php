<?php

    require_once("action/ChatAction.php");
    $action = new ChatAction();
    $data = $action->execute();
    $pageName = "chat";
    require_once("partial/header.php");
?>

<div id="framedeck">
    <div id="closedeck">X</div>
    <iframe style="width:100%;height:90%;"src="https://magix.apps-de-cours.com/server/#/deck/<?=$data["key"]?>/large"></iframe>
</div>

<div id="background-container-absolute">
    <div id="background-container">
        <div class="background" id="bgtop1"><img src="./img/cityclose.png" alt=""></div>
        <div class="background" id="bgtop2"><img src="./img/cityclose.png" alt=""></div>
        <div class="background" id="bgbottom1"><img src="./img/grassbackground2.png" alt=""></div>
        <div class="background" id="bgbottom2"><img src="./img/grassbackground2.png" alt=""></div>
        <div class="background" id="bgwalker"></div>
    </div>
</div>

<div id="maincontainer" class="flexcenter">
    <div id="chatmenu" class="flexspacearound">
        <div class="roomtype cursor" id="training">TRAINING</div>
        <div class="roomtype cursor" id="pvp">PVP</div>
        <div class="roomtype cursor" id="deck">DECK</div>
        <div class="roomtype cursor" id="stats">STATS</div>

        <div class="roomtype cursor">
            <?php
                if ($data["public"]) {
                    ?>
                        <a href="?logout=true">
                            <div class="flexcenter "id="disconnect">
                                DISCONNECT
                            </div>    
                        </a>
                        
                    <?php
                }
            ?>
        </div>
    </div>
    <div id="chatmenu" class="flexspacearound">    
        <div class="roomtype cursor" id="arena">ARENA</div>
        <div class="roomtype cursor" id="coop">COOP</div>
    </div>

    <div id="chatboxcontainer">
        <div id="chatbox" class="flexcenter">
            <iframe style="width:100%;height:90%;" onload="applyStyles(this)" 
            src="https://magix.apps-de-cours.com/server/#/chat/<?=$data["key"]?>/large">
            </iframe>
        </div>
    </div>

</div>







<?php
    require_once("partial/footer.php");
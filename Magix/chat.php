<?php

    require_once("action/ChatAction.php");
    $action = new ChatAction();
    $data = $action->execute();
    $pageName = "chat";
    require_once("partial/header.php");
?>

<div id="maincontainer" class="flexcenter">
    <div id="chatmenu" class="flexspacearound">
        <div class="roomtype" id="training">TRAINING</div>
        <div class="roomtype" id="pvp">PVP</div>
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
<?php

    require_once("action/ChatAction.php");
    $action = new ChatAction();
    $data = $action->execute();
    $pageName = "chat";
    require_once("partial/header.php");
?>

<div id="maincontainer" class="flexspacearound">

    <div id="mainwalker"></div>

    <div id="chatbox">
        <iframe style="width:100%;height:100%;" onload="applyStyles(this)" 
                src="https://magix.apps-de-cours.com/server/#/chat/<?=$data["key"]?>/large">
        </iframe>
    </div>

    <div id="chatmenu" class="flexspacearound">
        <div class="roomtype" id="training">TRAINING</div>
        <div class="roomtype" id="pvp">PVP</div>
    </div>

</div>


<?php
    require_once("partial/footer.php");
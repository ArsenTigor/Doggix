<?php

    require_once("action/ChatAction.php");

    

    $action = new ChatAction();
    $data = $action->execute();
    $pageName = "chat";

    require_once("partial/header.php");
?>

<div>
    YOU ARE IN THE CHAT PAGE
</div>


<iframe style="width:700px;height:400px;" onload="applyStyles(this)" 
        src="https://magix.apps-de-cours.com/server/#/chat/<?=$data["key"]?>/large">
</iframe>





<?php
    require_once("partial/footer.php");
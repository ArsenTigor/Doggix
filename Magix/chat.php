<?php

    require_once("action/ChatAction.php");

    $action = new ChatAction();
    $data = $action->execute();

    require_once("partial/header.php");
?>

<div>
    YOU ARE IN THE CHAT PAGE
</div>




<?php
    require_once("partial/footer.php");
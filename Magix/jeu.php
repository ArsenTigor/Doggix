<?php

    require_once("action/JeuAction.php");

    

    $action = new JeuAction();
    $data = $action->execute();
    $pageName = "jeu";

    require_once("partial/header.php");
?>


A BRAND NEW WORLD!



<?php
    require_once("partial/footer.php");
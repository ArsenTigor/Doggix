<?php

    require_once("action/StatsAction.php");
    

    $action = new StatsAction();
    $data = $action->execute();
    $pageName = "stats";

    require_once("partial/header.php");
?>


<?php
    require_once("action/AjaxJeuAction.php");

    $action = new AjaxJeuAction();
    $data = $action->execute();
    $pageName = "ajax-jeu";

    echo json_encode($data["result"]);
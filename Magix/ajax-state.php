<?php
    require_once("action/AjaxStateAction.php");

    $action = new AjaxStateAction();
    $data = $action->execute();
    $pageName = "ajax-state";

    echo json_encode($data["result"]);
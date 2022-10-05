<?php
    require_once("action/AjaxAction.php");

    $action = new AjaxAction();
    $data = $action->execute();
    $pageName = "ajax";

    echo json_encode($data["result"]);
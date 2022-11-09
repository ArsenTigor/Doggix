<?php
    require_once("action/CommonAction.php");

    class AjaxJeuAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = "";

            if(isset($_POST["menu"])){
                $data = [];
                $data["key"] = $_SESSION["key"];
                if($_POST["menu"] == "endturn"){
                    $data["type"] = "END_TURN";
                    $result = parent::callAPI("games/action", $data);
                }
                if($_POST["menu"] == "surrender"){
                    $data["type"] = "SURRENDER";
                    $result = parent::callAPI("games/action", $data);
                }
                if($_POST["menu"] == "heropower"){
                    $data["type"] = "HERO_POWER";
                    $result = parent::callAPI("games/action", $data);
                }
            }

            if(isset($_POST["play"])){
                $data = [];
                $data["key"] = $_SESSION["key"];
                
            }


            return compact("result");
        }
    }
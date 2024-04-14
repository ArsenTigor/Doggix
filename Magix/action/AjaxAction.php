<?php
    require_once("action/CommonAction.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            $result = "";
            if(isset($_POST["typeOfRoom"])){
                $data = [];
                $data["key"] = $_SESSION["key"];
                if($_POST["typeOfRoom"] == "TRAINING"){
                    $data["type"] = "TRAINING";
                    $data["mode"] = "STANDARD";
                    $result = parent::callAPI("games/auto-match", $data);
                }                
                else if($_POST["typeOfRoom"] == "PVP"){
                    $data["type"] = "PVP";
                    $result = parent::callAPI("games/auto-match", $data);
                }
                else if($_POST["typeOfRoom"] == "ARENA"){
                    $data["type"] = "TRAINING";
                    $data["mode"] = "ARENA";
                    $result = parent::callAPI("games/auto-match", $data);
                }
                else if($_POST["typeOfRoom"] == "COOP"){
                    $data["type"] = "TRAINING";
                    $data["mode"] = "COOP";
                    $result = parent::callAPI("games/auto-match", $data);
                }
            }

            if(isset($_POST["username"])){
                $data["username"] = !empty($_SESSION["username"]) ? $_SESSION["username"] : "hooman";
                // localStorage.setItem = ("username", $data["username"]);
                $result = $data["username"];
            }

            return compact("result");

        }
    }
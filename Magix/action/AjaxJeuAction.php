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

            else if(isset($_POST["game"])){
                $data = [];
                $data["key"] = $_SESSION["key"];
                if($_POST["game"] == "play"){
                    $data["type"] = "PLAY";
                    $data["uid"] = $_POST["gameUID"];
                    $result = parent::callAPI("games/action", $data);
                }
                if($_POST["game"] == "attack"){
                    $data["type"] = "ATTACK";
                    $data["uid"] = $_POST["gameUID"];
                    $data["targetuid"] = $_POST["gameTarget"];
                    $result = parent::callAPI("games/action", $data);
                }
            }


            return compact("result");
        }
    }
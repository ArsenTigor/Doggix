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
                    $result = parent::callAPI("games/auto-match", $data);
                }
            }
            return compact("result");
        }
    
    }
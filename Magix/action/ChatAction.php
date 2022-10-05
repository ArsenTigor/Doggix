<?php
	require_once("action/CommonAction.php");

	class ChatAction extends CommonAction {
		
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {


            if (!empty($_GET["logout"])) {
                $result = CommonAction::callAPI("signout", $_SESSION);
                if($result == "SIGNED_OUT") {
                    header("location:index.php");
                }
                else{
                    //"INVALID_KEY"
                }
                session_unset();
                session_destroy();
                session_start();
            }
		

		}
	}
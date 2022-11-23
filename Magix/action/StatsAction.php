<?php
	require_once("action/CommonAction.php");
	require_once("action/DAO/CardDAO.php");

	class StatsAction extends CommonAction {
		
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}
		protected function executeAction() {


			$answers =  CardDAO::getData();
			var_dump($answers); exit();
			return compact("answers");
		}

	
	}
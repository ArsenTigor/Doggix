<?php
	require_once("action/CommonAction.php");
	require_once("action/DAO/CardDAO.php");

	class StatsAction extends CommonAction {
		
		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}
		protected function executeAction() {

			$count = CardDAO::getTotalData();
			// var_dump($count[0]['count']); exit();
			$cards =  CardDAO::getDataCountOrdered();
			
			foreach ($cards as &$array) {
				$calc = $array['count'] / $count[0]['count'] * 100;
				
				$temp = array('percent' => sprintf('%0.2f', round($calc, 2)));
				$array += $temp;
			}
			// var_dump($cards); exit();
			return compact("cards");
		}

	
	}
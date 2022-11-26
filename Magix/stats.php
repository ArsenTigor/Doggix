<?php

    require_once("action/StatsAction.php");
    

    $action = new StatsAction();
    $data = $action->execute();
    $pageName = "stats";

    require_once("partial/header.php");
?>
<div id=statcontainall class="flexcenter">
    
    <div id=statcontainer>
        <div class="flexcenter bigger">Statistiques</div>
        <div class="stats">
            <div class="numcard">
                Card ID
            </div>
            <div class="count">
                # Time played
            </div>
            <div class="percent">
                % Total played
            </div>
        </div>
        
        <?php
            if (sizeof($data["cards"]) > 0){
                foreach($data["cards"] as $card){
                ?>
                <div class="stats">
                    <div class="numcard">
                        <?= $card["cardid"] ?>
                    </div>
                    <div class="count">
                        <?= $card["count"] ?>
                    </div>
                    <div class="percent">
                        <?= $card["percent"] ?>%
                    </div>
                </div>
                <?php
            }}
        ?>
    </div>
</div>

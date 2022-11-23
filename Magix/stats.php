<?php

    require_once("action/StatsAction.php");
    

    $action = new StatsAction();
    $data = $action->execute();
    $pageName = "stats";

    require_once("partial/header.php");
?>

<?php
    if (sizeof($data["cards"]) > 0){
        foreach($data["cards"] as $card){
        ?>
        <div class="stats">
            <div class="numcard">
                <?= $card["cardid"] ?>
            </div>
        </div>
        <?php
    }}
?>
<?php

    require_once("action/StatsAction.php");
    

    $action = new StatsAction();
    $data = $action->execute();
    $pageName = "stats";

    require_once("partial/header.php");
?>
<div id=statcontainall class="flexcenter">
    
    <div id=statcontainer>
        <div class="flexcenter bigger" id="titre">Statistiques</div>
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

    <div class="backbutton cursor">Back</div>
    <div class="resetbutton cursor">Reset</div>

    <script>
        document.querySelector(".backbutton").onclick = e =>{
            window.location.href = "./chat.php"
        }
        document.querySelector(".resetbutton").onclick = e =>{
            let formData = new FormData();
            formData.append("reset", "yes")
            fetch("ajax-jeu.php", {
            method: "POST",
            body: formData
            })
            .then(response => response.json())
            .then(result => {
                
            })
            setTimeout(() => {
                location.reload();
            }, 2000);
        }


        let temp = localStorage.getItem("username");
        if(temp != null){
            document.querySelector("#titre").innerHTML = temp + "'s Statistiques"
        }

        
    </script>

</div>

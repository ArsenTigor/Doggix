<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();
    $pageName = "index";

    require_once("partial/header.php");
?>

<form id="loginform" action="index.php" method="post">
    <div class="form-label">Utilisateur : </div>
    <div class="form-input"><input type="text" name="username"></div>
    <div class="form-separator"></div>
    
    <div class="form-label">Mot de passe : </div>
    <div class="form-input"><input type="password" name="password" /></div>
    <div class="form-separator"></div>
    
    <div class="form-label">&nbsp;</div>
    <div class="form-input"><button>Connexion</button></div>
    <div class="form-separator"></div>
</form>

<div id="conteneur">
    <div id="ciel">
        a
    </div>

    <div id="terrain">
    </div>

</div>





<?php
    require_once("partial/footer.php");
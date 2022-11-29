<?php
    require_once("action/IndexAction.php");

    $action = new IndexAction();
    $data = $action->execute();
    $pageName = "index";

    require_once("partial/header.php");
?>
<div id=indextop>
    <div id="titlebox">
        <div id="title">Doggix</div>
        <div id="subtitle">Where every doggo is a good doggo</div>
    </div>

    <form id="loginform" action="index.php" method="post">
        <div class="form-label">Username : </div>
        <div class="form-input"><input type="text" name="username"></div>
        <div class="form-separator"></div>
        
        <div class="form-label">Password : </div>
        <div class="form-input"><input type="password" name="password" /></div>
        <div class="form-separator"></div>
        
        <div class="center"><button>Log in</button></div>
        <div class="form-separator"></div>
    </form>
</div>


<div id="conteneur">

    <div id="uppersection">
        <div id="citybackground"></div>
        <div id="city"></div>
        <div id="road"></div>
    </div>
    
    <div class=" cursor" id="terrain"></div>

</div>





<?php
    require_once("partial/footer.php");
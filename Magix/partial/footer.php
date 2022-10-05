</body>
<footer>Start of footer</footer>

<div class="center">
    <?php
        if ($data["public"]) {
            ?>
            <a href="?logout=true">
                <button>Deconnexion</button>
            </a>
            <?php
        }
    ?>
</div>
</html>
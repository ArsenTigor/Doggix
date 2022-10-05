</body>
<footer>Start of footer</footer>

<div class="center">
    <?php
        if ($data["public"]) {
            ?>
            <a href="?logout=true">
                <button>Vider</button>
            </a>
            <?php
        }
    ?>
</div>
</html>
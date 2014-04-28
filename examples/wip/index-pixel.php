<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="initial-scale=1 maximum-scale=1 user-scalable=0 minimal-ui" />
        <title>phaser</title>
        <base href="../" />
        <?php
            // $path = '/phaser';
            // require('../../../phaser/build/config.php');

            if (isset($_GET['f']))
            {
                $f = $_GET['f'];
        ?>
        <script src="_site/js/phaser-sideview.js" type="text/javascript"></script>
        <script src="_site/js/phaser.js" type="text/javascript"></script>
        <script src="wip/<?php echo $f?>" type="text/javascript"></script>
        <?php
            }
        ?>
        <style>
            body {
                margin: 0;
                padding: 0;
            }

            #phaser-example {
                display: none;
            }
        </style>
    </head>
    <body>

        <div id="actual-canvas"><canvas id="pixel" width="800" height="300" /></div>
        <div id="phaser-example"></div>

    </body>
</html>
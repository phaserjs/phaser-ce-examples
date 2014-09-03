<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>mosaic</title>
        <script src="jquery-2.0.3.min.js" type="text/javascript"></script>
        <?php

        if (($_SERVER['SERVER_NAME'] == '192.168.0.100' || $_SERVER['SERVER_NAME'] == 'localhost') && isset($_GET['single']) == false)
        {
            $p2 = false;
            $path = '/phaser';
            require('../../../../phaser/build/config.php');
        }
        else
        {
            echo "<script src=\"phaser.min.js\" type=\"text/javascript\"></script>";
        }
        ?>
        <script src="mosaic10.js" type="text/javascript"></script>
        <style>
            body {
                margin: 0;
                padding: 0;
            }
        </style>
    </head>
    <body>

        <div id="fx"></div>

        <input type="button" id="toggle" value="Toggle Pics" />

        <p>Tile Width: <input type="text" id="tileWidth" value="14" /> Height: <input type="text" id="tileHeight" value="19" /></p>
        <p>Duration: <input type="text" id="duration" value="1000" /></p>
        <p>Delay Min: <input type="text" id="delayMin" value="0" /> Max: <input type="text" id="delayMax" value="1500" /></p>

        <input type="button" id="startButton" value="Start" />

        <script type="text/javascript">

        var tileWidth = 14;
        var tileHeight = 19;

        $('#tileWidth').change(function() {
            tileWidth = this.value;
            console.log('tileWidth', tileWidth);
        });

        $('#tileHeight').change(function() {
            tileHeight = this.value;
            console.log('tileHeight', tileHeight);
        });

        $('#startButton').click(function() {
            start();
        });

        $('#toggle').click(function() {
            togglePics();
        });

        </script>

    </body>
</html>
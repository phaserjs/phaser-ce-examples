<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>mosaic</title>
        <script src="jquery-2.0.3.min.js" type="text/javascript"></script>
        <?php
        if ($_SERVER['SERVER_NAME'] == '192.168.0.100' && isset($_GET['single']) == false)
        {
            $p2 = false;
            $path = '/phaser';
            require('../../../../phaser/build/config.php');
        }
        else
        {
            echo "<script src=\"phaser-minimal.min.js\" type=\"text/javascript\"></script>";
        }
        ?>
        <script src="mosaic5.js" type="text/javascript"></script>
        <style>
            body {
                margin: 0;
                padding: 0;
            }
        </style>
    </head>
    <body>

        <div id="fx"></div>

        <input type="button" id="effect1" value="Alpha 1" />
        <input type="button" id="effect2" value="Alpha 2" />
        <input type="button" id="effect3" value="Alpha 3" />
        <input type="button" id="effect4" value="Scale 1" />
        <input type="button" id="effect5" value="Scale 2" />
        <input type="button" id="toggle" value="Toggle Pics" />

        <br />

        <p>Tile Width: <input type="text" id="tileWidth" value="14" /> Height: <input type="text" id="tileHeight" value="19" /></p>
        <p>Duration Min: <input type="text" id="durationMin" value="250" /> Max: <input type="text" id="durationMax" value="1000" /></p>
        <p>Delay Min: <input type="text" id="delayMin" value="0" /> Max: <input type="text" id="delayMax" value="5000" /></p>

        <input type="button" value="Update" />

        <script type="text/javascript">

        var effect = 5;
        var tileWidth = 14;
        var tileHeight = 19;

        $('#tileWidth').change(function() {
            console.log('tileWidth', this.value);
            tileWidth = this.value;
        });

        $('#tileHeight').change(function() {
            console.log('tileHeight', this.value);
            tileHeight = this.value;
        });

        $('#effect1').click(function() {
            effect = 1;
        });

        $('#effect2').click(function() {
            effect = 2;
        });

        $('#effect3').click(function() {
            effect = 3;
        });

        $('#effect4').click(function() {
            effect = 4;
        });

        $('#toggle').click(function() {
            togglePics();
        });

        </script>

    </body>
</html>
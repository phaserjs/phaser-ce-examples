<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Sprite Sheet Generator</title>
        <?php
            $path = '/phaser';
            require('../../../../phaser/build/config.php');
        ?>
        <script src="Blob.js" type="text/javascript"></script>
        <script src="CanvasToBlob.js" type="text/javascript"></script>
        <script src="FileSaver.js" type="text/javascript"></script>
        <script src="spritesheet.js" type="text/javascript"></script>
        <style>
            body {
                font-family: Arial;
                font-size: 14px;
            }

            #drop_zone {
                position: absolute;
                border: 2px dashed #bbb;
                border-radius: 5px;
                padding: 25px;
                text-align: center;
                width: 300px;
                height: 100px;
            }

            #drop_zone2 {
                position: absolute;
                left: 400px;
                border: 2px dashed #8fc447;
                border-radius: 5px;
                padding: 25px;
                text-align: center;
                width: 300px;
                height: 100px;
            }

            #drop_zone3 {
                position: absolute;
                left: 800px;
                border: 2px dashed #eedd77;
                border-radius: 5px;
                padding: 25px;
                text-align: center;
                width: 300px;
                height: 100px;
            }

            #ss {
                position: absolute;
                top: 180px;
                border: 1px dashed #000;
            }
        </style>
    </head>
    <body>

        <div id="drop_zone">Drop files here to<br />make a sprite sheet</div>
        <div id="drop_zone2">Drop files here to<br />trim coords</div>
        <div id="drop_zone3">Drop files here to<br />sprite gen</div>
        <div id="ss"></div>

    </body>
</html>
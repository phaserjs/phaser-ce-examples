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
                width: 40%;
                height: 100px;
            }

            #drop_zone2 {
                position: absolute;
                left: 50%;
                border: 2px dashed #8fc447;
                border-radius: 5px;
                padding: 25px;
                text-align: center;
                width: 40%;
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

        <div id="drop_zone">Drop files here to make a sprite sheet</div>
        <div id="drop_zone2">Drop files here here to trim coords</div>
        <div id="ss"></div>

    </body>
</html>
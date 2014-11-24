<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Audio Sprite Generator</title>
        <?php
            $path = '/phaser';
            require('../../../../phaser/build/config.php');
        ?>
        <script src="Blob.js" type="text/javascript"></script>
        <script src="CanvasToBlob.js" type="text/javascript"></script>
        <script src="FileSaver.js" type="text/javascript"></script>
        <script src="audiotool.js" type="text/javascript"></script>
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

            #ss {
                position: absolute;
                top: 180px;
                border: 1px dashed #000;
            }
        </style>
    </head>
    <body>

        <div id="drop_zone">Drop files here to create an audio sprite</div>
        <div id="ss"></div>

    </body>
</html>
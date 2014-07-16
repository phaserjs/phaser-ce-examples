<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>phaser DOM test</title>
        <base href="../" />
        <script src="_site/js/jquery-2.0.3.min.js" type="text/javascript"></script>
        <?php
            $path = '/phaser';
            require('../../../phaser/build/config.php');
        ?>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial;
                font-size: 14px;
            }

            #t {
                position: absolute;
                top: 0;
                left: 0;
            }
        </style>
    </head>
    <body>

        <input id="t" type="text" value="Hello World!" />

        <div id="phaser-example"></div>

        <script type="text/javascript">

        //  Note the small game size
        var game = new Phaser.Game(320, 256, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

        function preload() {

            game.load.image('pic', 'assets/pics/tvzor_lazur.png');

        }

        function create() {

            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.scale.minWidth = 320;
            game.scale.minHeight = 256;
            game.scale.maxWidth = 1280;
            game.scale.maxHeight = 1024;
            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.setScreenSize(true);

            var sprite = game.add.sprite(0, 0, 'pic');
            sprite.smoothed = false;

        }

        function update() {

            //  We want the DOM element positioned at 80 x 70 in the world, regardless of game scale
            var x = game.stage.offset.x + (80 * game.scale.scaleFactorInversed.x);
            var y = game.stage.offset.y + (70 * game.scale.scaleFactorInversed.y);

            $('#t').css("left", x + "px");
            $('#t').css("top", y + "px");

        }

        </script>

    </body>
</html>
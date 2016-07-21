<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>phaser</title>
        <base href="../../" />
        <?php
        if ($_SERVER['SERVER_NAME'] == '192.168.0.100' && isset($_GET['single']) == false)
        {
            $path = '/phaser';
            require('../../../../phaser/build/config.php');
        }
        ?>
        <style>
            body {
                margin: 0;
                padding: 0;
                background-color: #3d3d3d;
            }

            #parent1 {
                background-color: red;
                width: 100%;
                height: 400px;
            }
        </style>
    </head>
    <body>

        <script type="text/javascript">
var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

var sprite;

function preload() {

    game.stage.backgroundColor = '#4d4d4d';

    game.load.image('einstein', 'assets/pics/ninja-masters2.png');

    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

}

function create() {

    sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'einstein');
    sprite.anchor.set(0.5);

    game.scale.onSizeChange.add(function(c, w, h){console.log('xcb ' + w + 'x' + h);});

    game.scale.setResizeCallback(resize, this);

}

function resize(scaleManager, size) {

    // console.log('resize', size);

    //  Do custom stuff here
    game.scale.setGameSize(size.width, size.height);

    sprite.x = size.width / 2;
    sprite.y = size.height / 2;

}

function update() {

}
       
function render() {

    game.debug.text(game.width + " x " + game.height, 32, 32);

}

        </script>

    </body>
</html>
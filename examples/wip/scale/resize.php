<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>phaser</title>
        <base href="../../" />
        <script src="_site/js/jquery-2.0.3.min.js" type="text/javascript"></script>
        <?php
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
        </style>
    </head>
    <body>

        <div id="parent1"></div>

        <script type="text/javascript">
//  100% of the window
var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

var sprite;

function preload() {

    game.stage.backgroundColor = '#4d4d4d';

    // game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;

    game.load.image('einstein', 'assets/pics/ninja-masters2.png');

}

function create() {

    sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'einstein');
    sprite.anchor.set(0.5);

    game.scale.setResizeCallback(resize, this);

    game.scale.onSizeChange.add(function(){console.log('cb');});

}

function resize(width, height) {

    sprite.x = width / 2;
    sprite.y = height / 2;

}

function update() {

}
       
function render() {

    game.debug.text(game.width + " x " + game.height, 32, 32);

}

        </script>

    </body>
</html>
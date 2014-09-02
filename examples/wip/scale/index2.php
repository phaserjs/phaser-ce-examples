<!doctype html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>phaser</title>
        <base href="../../" />
        <script src="_site/js/jquery-2.0.3.min.js" type="text/javascript"></script>
        <?php
        if ($_SERVER['SERVER_NAME'] == '192.168.0.100' && isset($_GET['single']) == false)
        {
            $p2 = false;
            $path = '/phaser';
            require('../../../../phaser/build/config.php');
        }
        else
        {
        // <script src="wip/scale/phaser.min.js"></script>
        // <script src="/photonstorm-pixi.js/bin/pixi.dev.js"></script>
        ?>
        <script src="/photonstorm-pixi.js/bin/pixi.dev.js"></script>
        <?php
        }
        ?>
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial;
                font-size: 14px;
                background-color: #3d3d3d;
            }
        </style>
    </head>
    <body>

        <script type="text/javascript">

//  100% of the window
var game = new Phaser.Game("100%", "100%", Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var bg;
var spriteMiddle;
var spriteTopLeft;
var spriteTopRight;
var spriteBottomLeft;
var spriteBottomRight;

function preload() {

    game.stage.backgroundColor = '#4d4d4d';

    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    game.load.image('tetris1', 'assets/sprites/tetrisblock1.png');
    game.load.image('tetris2', 'assets/sprites/tetrisblock2.png');
    game.load.image('tetris3', 'assets/sprites/tetrisblock3.png');
    game.load.image('hotdog', 'assets/sprites/hotdog.png');
    game.load.image('starfield', 'assets/skies/deep-space.jpg');

}

function create() {

    bg = game.add.tileSprite(0, 0, game.width, game.height, 'starfield');

    spriteMiddle = game.add.sprite(game.world.centerX, game.world.centerY, 'hotdog');
    spriteMiddle.anchor.set(0.5);

    /*
    //  Version 1 = works fine
    spriteTopLeft = game.add.sprite(0, 0, 'tetris3');
    spriteTopRight = game.add.sprite(0, 0, 'tetris1');
    spriteBottomLeft = game.add.sprite(0, 0, 'tetris2');
    spriteBottomRight = game.add.sprite(0, 0, 'tetris3');

    spriteTopRight.x = game.width - spriteTopRight.width;
    spriteBottomLeft.y = game.height - spriteBottomLeft.height;

    spriteBottomRight.x = game.width - spriteBottomRight.height;
    spriteBottomRight.y = game.height - spriteBottomRight.height;
    */

    spriteTopLeft = game.add.sprite(0, 0, 'tetris3');

    spriteTopRight = game.add.sprite(game.width, 0, 'tetris1');
    spriteTopRight.anchor.set(1, 0);

    spriteBottomLeft = game.add.sprite(0, game.height, 'tetris2');
    spriteBottomLeft.anchor.set(0, 1);

    spriteBottomRight = game.add.sprite(game.width, game.height, 'tetris3');
    spriteBottomRight.anchor.set(1, 1);

    //  This will set a minimum world size - if not specified the world size will adapt to match the browser as it resizes
    game.world.setBounds(0, 0, 800, 600);

    game.scale.setResizeCallback(resize, this);

}

function resize(width, height) {

    bg.width = width;
    bg.height = height;

    spriteMiddle.x = game.world.centerX;
    spriteMiddle.y = game.world.centerY;

    //  v1 Works fine 
    // spriteTopRight.x = game.width - spriteTopRight.width;
    // spriteBottomLeft.y = game.height - spriteBottomLeft.height;

    // spriteBottomRight.x = game.width - spriteBottomRight.width;
    // spriteBottomRight.y = game.height - spriteBottomRight.height;

    spriteTopRight.x = game.width;
    spriteBottomLeft.y = game.height;

    spriteBottomRight.x = game.width;
    spriteBottomRight.y = game.height;

}

function update() {
}
       
function render() {

    // game.debug.text(game.width + " x " + game.height, 32, 32);
    game.debug.cameraInfo(game.camera, 32, 32);
    game.debug.inputInfo(32, 200);

}

        </script>

    </body>
</html>
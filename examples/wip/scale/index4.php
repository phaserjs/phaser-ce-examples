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

        <div id="parent1"></div>

        <script type="text/javascript">

var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.stage.backgroundColor = '#4d4d4d';

    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    game.load.image('backdrop', 'assets/pics/remember-me.jpg');
    game.load.image('card', 'assets/sprites/mana_card.png');

}

var card;
var cursors;

function create() {

    game.world.setBounds(0, 0, 1920, 1200);

    game.add.sprite(0, 0, 'backdrop');

    card = game.add.sprite(200, 200, 'card');

    game.camera.follow(card);

    cursors = game.input.keyboard.createCursorKeys();

    game.scale.setResizeCallback(resize, this);

}

function resize(width, height) {

    // game.world.setBounds(0, 0, width, height);

}

function update() {

    if (cursors.left.isDown)
    {
        card.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        card.x += 4;
    }

    if (cursors.up.isDown)
    {
        card.y -= 4;
    }
    else if (cursors.down.isDown)
    {
        card.y += 4;
    }

}
       
function render() {

    // game.debug.text(game.width + " x " + game.height, 32, 32);
    // game.debug.cameraInfo(game.camera, 32, 32);
    // game.debug.inputInfo(32, 200);

    game.debug.cameraInfo(game.camera, 500, 32);
    game.debug.spriteCoords(card, 32, 32);

}

        </script>

    </body>
</html>
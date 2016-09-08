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

            #parent1 {
                background-color: red;
                width: 100%;
                height: 400px;
                display: none;
            }
        </style>
    </head>
    <body>

        <!-- <div id="parent1"></div> -->

        <script type="text/javascript">
//  Normal fixed pixel size game
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

//  100% width of the window + 600px height
// var game = new Phaser.Game("100%", 600, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

//  100% of the window
var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });

//  100% of the container div
// var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, 'parent1', { preload: preload, create: create, update: update, render: render });

//  50% of the container div
// var game = new Phaser.Game("50%", "100%", Phaser.CANVAS, 'parent1', { preload: preload, create: create, update: update, render: render });

var cursors;
var sprite;

function preload() {

    game.stage.backgroundColor = '#4d4d4d';

    // game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    //  Allow these to be percentages?
    // game.scale.minWidth = 480;
    // game.scale.minHeight = 260;

    game.load.image('einstein', 'assets/pics/ninja-masters2.png');

}

function create() {

    sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'einstein');
    sprite.anchor.set(0.5);

    sprite = game.add.sprite(0, 0, 'einstein');

    // cursors = game.input.keyboard.createCursorKeys();

    // game.scale.setResizeCallback(resize, this);

}

function resize(width, height) {

    sprite.x = width / 2;
    sprite.y = height / 2;

    // console.log('resize callback', width, height, 'world', game.world.width, game.world.height, game.world.centerX, game.world.centerY);
    // console.log('game', game.canvas.width, game.canvas.height);
    // console.log('camera', game.camera.x, game.camera.y, game.camera.width, game.camera.height);
    // console.log(sprite.x, sprite.y);

}

function update() {

    if (cursors.left.isDown)
    {
        $('#parent1').css('width', game.width - 4);
    }
    else if (cursors.right.isDown)
    {
        $('#parent1').css('width', game.width + 4);
    }

    if (cursors.up.isDown)
    {
        $('#parent1').css('height', game.height - 4);
    }
    else if (cursors.down.isDown)
    {
        $('#parent1').css('height', game.height + 4);
    }

}
       
function render() {

    game.debug.text(game.width + " x " + game.height, 32, 32);

    // game.context.fillStyle = 'rgb(255,0,0)';
    // game.context.fillRect(0,0,64,64);

}

        </script>

    </body>
</html>
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
        // <script src="/photonstorm-pixi.js/bin/pixi.dev.js"></script>
        ?>
        <?php
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

        <script type="text/javascript">

var game = new Phaser.Game("100%", "100%", Phaser.CANVAS, '', { init: init, preload: preload, create: create, update: update, render: render, resize: resize });

var bg;
var sprite;

function init() {

    game.stage.disableVisibilityChange = true;
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;

    // game.scale.setMinMax(400, 300, 800, 600);
    game.scale.grid.setSize(800, 600);

}

function preload() {

    game.stage.backgroundColor = '#4d4d4d';

    game.load.image('einstein', 'assets/pics/ninja-masters2.png');
    game.load.image('card', 'assets/sprites/mana_card.png');

}

var stuck = false;
var offset = new Phaser.Point();
var dropMarker = new Phaser.Circle();

function create() {

    bg = game.add.sprite(0, 0, 'einstein');
    bg.width = game.width;
    bg.height = game.height;
    bg.alpha = 0.5;

    sprite = game.make.sprite(0, 0, 'card');
    sprite.inputEnabled = true;
    sprite.input.scaleLayer = true;

    sprite.events.onInputDown.add(onDown, this);
    sprite.events.onInputUp.add(onUp, this);

    var fluidLayer = game.scale.grid.createFluidLayer([ sprite ]);
}

function onDown (sprite, pointer) {

    console.log('onDown', stuck);

    if (stuck)
    {
        //  drop it
        stuck = false;
    }
    else
    {
        stuck = true;
        offset.setTo(sprite.x - localX(pointer.x), sprite.y - localY(pointer.y));
        dropMarker.setTo(pointer.x, pointer.y, 44);
    }

}

function onUp (sprite, pointer) {

    console.log('onUp', stuck);

    if (stuck)
    {
        //  Outside the drop marker? Then we'll consider this as a drag and reset the stuck state
        if (!dropMarker.contains(pointer.x, pointer.y))
        {
            console.log('you upped outside of the dropMarker so you must be dragging');
            stuck = false;
        }
    }
    
}

function localX (x) {

    //  x is in world space (actual pixel values)
    x -= game.scale.grid.boundsFluid.x;
    x *= game.scale.grid.scaleFluidInversed.x;

    return x;

}

function localY (y) {

    y -= game.scale.grid.boundsFluid.y;
    y *= game.scale.grid.scaleFluidInversed.y;

    return y;

}

function update() {

    //  Do this inside a moveCallback, not an update (it will be smoother)
    if (stuck)
    {
        sprite.x = localX(game.input.x) + offset.x;
        sprite.y = localY(game.input.y) + offset.y;
    }

}

function resize(width, height) {

    bg.width = width;
    bg.height = height;

}
       
function render() {

    game.debug.text(game.input.x + " x " + game.input.y, 32, 32);

    game.scale.grid.debug();

    game.debug.geom(dropMarker);

}

        </script>

    </body>
</html>

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('bunny', 'assets/sprites/bunny.png');

}

var bunny;

function create() {

    bunny = game.add.sprite(game.world.centerX, game.world.centerY, 'bunny');

    bunny.anchor.set(0.5);

    //  Listen for input events on this sprite
    bunny.inputEnabled = true;

    //  This will check the pixel every time the mouse moves, which is really expensive!
    //  You can also only do a pixel perfect check on click, which is much cheaper - so
    //  pick the right one accordingly.
    bunny.input.pixelPerfectOver = true;

    //  Enable the hand cursor
    bunny.input.useHandCursor = true;

}

function update() {

    //  Rotate slowly
    bunny.angle += 0.05;

}

function render() {

    game.debug.spriteInputInfo(bunny, 32, 32);
    game.debug.geom(bunny.input._tempPoint);

}

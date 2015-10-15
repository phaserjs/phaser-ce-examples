
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('bunny', 'assets/sprites/bunny.png');

}

var bunny;
var lastDuration = 0;

function create() {

    bunny = game.add.sprite(game.world.centerX, game.world.centerY, 'bunny');

    bunny.alpha = 0.5;
    bunny.anchor.set(0.5);

    game.input.onUp.add(getTime, this);

}

function update() {

    if (game.input.activePointer.isDown)
    {
        bunny.alpha = 1;
    }
    else
    {
        bunny.alpha = 0.5;
    }

}

function getTime(pointer) {

    // lastDuration = pointer.timeUp - pointer.timeDown;

    lastDuration = pointer.duration;

}

function render() {

    game.debug.text("Duration: " + game.input.activePointer.duration, 32, 32);
    game.debug.text("Last Duration: " + lastDuration, 32, 64);

}
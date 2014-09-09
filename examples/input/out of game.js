
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('rain', 'assets/pics/thalion-rain.png');
    game.load.image('bubble', 'assets/pics/bubble-on.png');

}

var bubble;

function create() {

    game.add.tileSprite(0, 0, 800, 600, 'rain');

    bubble = game.add.image(game.world.centerX, game.world.centerY, 'bubble');
    bubble.anchor.set(0.5);

}

function update() {

    if (game.input.activePointer.withinGame)
    {
        bubble.alpha = 1;
    }
    else
    {
        bubble.alpha = 0.3;
    }

}

function render() {

    game.debug.inputInfo(32, 32);
    game.debug.pointer(game.input.activePointer);

}

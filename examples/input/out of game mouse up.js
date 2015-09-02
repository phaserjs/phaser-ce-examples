
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', this);

function preload() {

    game.load.image('rain', 'assets/pics/thalion-rain.png');
    game.load.image('bubble', 'assets/pics/bubble-on.png');

}

var bubble;

function create() {

    game.add.tileSprite(0, 0, 800, 600, 'rain');

    bubble = game.add.image(game.world.centerX, game.world.centerY, 'bubble');
    bubble.anchor.set(0.5);

    bubble.inputEnabled = true;

    bubble.events.onInputDown.add(onDown, this);
    bubble.events.onInputUp.add(onUp, this);

}

function onDown() {

    bubble.alpha = 0.3;

}

function onUp() {

    bubble.alpha = 1;

}

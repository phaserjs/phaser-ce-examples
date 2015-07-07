
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('ball', 'assets/sprites/pangball.png');

}

var sprite;
var tween;

function create() {

    game.stage.backgroundColor = '#2384e7';

    sprite = game.add.sprite(100, 250, 'ball');

    tween = game.add.tween(sprite);
    tween.to({ x: [500, 500, 100, 100], y: [250, 150, 150, 250] }, 3000, "Linear");
    tween.start();

    game.input.onDown.add(again, this);

}

function again() {

    if (!tween.isRunning)
    {
        sprite.position.setTo(100, 250);
        tween.start();
    }

}

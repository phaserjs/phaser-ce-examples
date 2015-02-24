
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('atari', 'assets/sprites/atari800xl.png');

}

var sprite;
var bounds;

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    bounds = new Phaser.Rectangle(100, 100, 500, 400);

    //  Create a graphic so you can see the bounds
    var graphics = game.add.graphics(bounds.x, bounds.y);
    graphics.beginFill(0x000077);
    graphics.drawRect(0, 0, bounds.width, bounds.height);

    sprite = game.add.sprite(300, 300, 'atari');
    sprite.inputEnabled = true;
    sprite.anchor.set(0.5);

    sprite.input.enableDrag();
    sprite.input.boundsRect = bounds;

}

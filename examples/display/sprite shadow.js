
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('hotdog', 'assets/sprites/hotdog.png');

}

var sprite;
var shadow;
var offset = new Phaser.Point(10, 8);

function create() {

    game.stage.backgroundColor = "#0c9fc7";

    shadow = game.add.sprite(game.world.centerX, game.world.centerY, 'hotdog');
    shadow.anchor.set(0.5);
    shadow.tint = 0x000000;
    shadow.alpha = 0.6;

    sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'hotdog');
    sprite.anchor.set(0.5);

    game.input.addMoveCallback(move, this);

}

function move(pointer, x, y) {

    sprite.x = x;
    sprite.y = y;

    shadow.x = sprite.x + offset.x;
    shadow.y = sprite.y + offset.y;

}


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.atlas('pwr2', 'assets/sprites/pwr2.png', 'assets/sprites/pwr2.json');

}

var sprite1;
var sprite2;
var count = 0;

function create() {

    sprite1 = game.add.tileSprite(0, 0, 800, 600, 'pwr2', 'mushroom2');
    sprite2 = game.add.tileSprite(0, 0, 800, 600, 'pwr2', 'hotdog');

}

function update() {

    count += 0.005;

    sprite1.tileScale.x = 2 + Math.sin(count);
    sprite1.tileScale.y = 2 + Math.cos(count);

    sprite2.tilePosition.x -= Math.sin(count) * 4;
    sprite2.tilePosition.y -= Math.cos(count) * 4;

}

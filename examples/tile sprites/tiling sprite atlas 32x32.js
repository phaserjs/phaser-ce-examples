
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.atlas('pwr2', 'assets/sprites/pwr2.png', 'assets/sprites/pwr2.json');
    game.load.image('mushroom', 'assets/sprites/mushroom2.png');

}

var sprite;

function create() {

    // sprite = game.add.tileSprite(0, 0, 800, 600, 'pwr2', 'hotdog');
    sprite = game.add.tileSprite(0, 0, 800, 600, 'pwr2', 'mushroom2');
    // sprite = game.add.tileSprite(0, 0, 800, 600, 'pwr2', 'firstaid');

    // sprite = game.add.tileSprite(0, 0, 800, 600, 'mushroom');

}

function update() {

    sprite.tilePosition.x += 1;
    sprite.tilePosition.y += 1;

}


var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.atlas('test', 'assets/sprites/tstrim.png', 'assets/sprites/tstrim.json');

}

var sprite;
var tilesprite;

function create() {

    sprite = game.add.sprite(0, 0, 'test', 'ts-trim');
    sprite = game.add.tileSprite(100, 0, 500, 600, 'test', 'ts-trim');

}

function update() {

    // sprite.tileScale.x = 2 + Math.sin(count);
    // sprite.tileScale.y = 2 + Math.cos(count);
    
    // sprite.tilePosition.x += 1;
    // sprite.tilePosition.y += 1;

}

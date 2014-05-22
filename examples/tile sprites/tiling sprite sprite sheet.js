
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var tilesprite;
var count = 0;

function preload() {

    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);

}

var sprite;

function create() {

    //  'mummy' is a sprite sheet in the cache
    //  10 is frame 10 from the sprite sheet
    sprite = game.add.tileSprite(0, 0, 800, 600, 'mummy', 10);

}

function update() {

    count += 0.005

    sprite.tileScale.x = 2 + Math.sin(count);
    sprite.tileScale.y = 2 + Math.cos(count);
    
    sprite.tilePosition.x += 1;
    sprite.tilePosition.y += 1;

}

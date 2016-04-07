
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.atlas('atlas', 'assets/sprites/atlas_hash_trim.png', 'assets/sprites/atlas_json_hash_trim.json');

}

var bmd;
var sprite;

function create() {

    game.stage.backgroundColor = '#2d2d8d';

    bmd = game.add.bitmapData(800, 600);
    bmd.addToWorld(8, 8);

    sprite = game.add.sprite(100, 64, 'atlas', 'contra3');
    sprite.tint = 0;

    bmd.draw(sprite);

    sprite.tint = 0xffffff;

}

function update() {

    if (game.input.activePointer.isDown)
    {
        // bmd.draw(jellyfish, game.input.activePointer.position.x, game.input.activePointer.position.y);
    }

}


var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('bsquadron1', 'assets/sprites/bsquadron1.png');
    game.load.image('bsquadron2', 'assets/sprites/bsquadron2.png');
    game.load.image('bsquadron3', 'assets/sprites/bsquadron3.png');
    game.load.atlas('mixed', 'assets/sprites/atlas_array_trim.png', 'assets/sprites/atlas_json_array_trim.json');
    game.load.atlas('pwr2', 'assets/sprites/pwr2.png', 'assets/sprites/pwr2.json');
    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');

}

var sprite2;
var count = 0;

function create() {

    // sprite2 = game.add.tileSprite(0, 0, 800, 600, 'pwr2', 'mushroom2');

    // game.add.sprite(0, 0, 'bsquadron1');

    game.add.sprite(100, 0, 'mixed', 'contra1');
    game.add.sprite(200, 0, 'mixed', 'cactuar');
    game.add.sprite(300, 0, 'mixed', 'contra3');
    game.add.sprite(400, 0, 'mixed', 'melon');
    game.add.sprite(500, 0, 'mixed', 'ladycop');

    // game.add.sprite(200, 0, 'bsquadron2');

    // sprite1 = game.add.tileSprite(0, 0, 800, 600, 'pwr2', 'hotdog');

    // game.add.bitmapText(200, 100, 'desyrel', 'Phaser & Pixi\nrocking!', 64);

    // game.add.sprite(300, 0, 'bsquadron3');

    game.renderer.setTexturePriority(['bsquadron1', 'bsquadron2', 'bsquadron3', 'mixed', 'pwr2', 'desyrel']);

}

function update() {

    // count += 0.005;

    // sprite2.tilePosition.x -= Math.sin(count) * 4;
    // sprite2.tilePosition.y -= Math.cos(count) * 4;

}

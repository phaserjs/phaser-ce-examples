
// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.atlas('test', 'assets/sprites/tstrim.png', 'assets/sprites/tstrim.json');

}

var sprite;
var tilesprite;

function create() {

    sprite = game.add.sprite(0, 0, 'test', 'ts-trim');
    sprite = game.add.tileSprite(100, 0, 500, 600, 'test', 'ts-trim');

}

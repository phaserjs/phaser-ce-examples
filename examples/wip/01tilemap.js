
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('blade', 'assets/pics/acryl_bladerunner.png');

}

var cursors;

function create() {

    var map = new PIXI.Tilemap(game.cache.getPixiTexture('blade'));

    console.log(map);

    game.stage.addChild(map);

    // cursors = game.input.keyboard.createCursorKeys();

}

function update() {


}

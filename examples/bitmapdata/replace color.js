
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('crystal', 'assets/pics/jim_sachs_time_crystal.png');

}

var bmd;

function create() {

	bmd = game.make.bitmapData();
    bmd.load('crystal');
    bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5);

	game.input.onDown.add(recolor, this);

}

function recolor () {

    // replaceRGB: function (sourceR, sourceG, sourceB, sourceA, destR, destG, destB, destA, region) {

	bmd.replaceRGB(0, 85, 255, 255, 0, 250, 40, 255);

}


// var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('font', 'assets/demoscene/knighthawks.png');

}

var font;
var mask;

function create() {

	font = game.make.bitmapData(320, 150);
	mask = game.make.bitmapData(320, 150);
	mask.fill(50, 50, 50);

	font.draw('font');

	font.update();

	game.add.sprite(0, 0, font);
	game.add.sprite(0, 150, mask);

	game.input.onDown.addOnce(getMask, this);

}

function getMask () {

	font.extract(mask, 237, 0, 140);

}

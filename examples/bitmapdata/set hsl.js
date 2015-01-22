
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('pic', 'assets/tests/ships.png');

}

var bmd;

function create() {

	game.stage.backgroundColor = '#2d2d2d';

	bmd = game.make.bitmapData();

	bmd.load('pic');

	var sprite = bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 3, 3);
	sprite.smoothed = false;

	game.input.onDown.add(startProcess, this);

}

function startProcess () {

	//	fixed h
	// bmd.setHSL(0.2);

	//	shift
	bmd.shiftHSL(0.1);

	// bmd.shiftHSL(0.1, null, null, new Phaser.Rectangle(32, 32, 100, 100));

	//	white hit
	// bmd.shiftHSL(null, null, 1.0);

	//	desaturation
	// bmd.shiftHSL(null, -1.0, null);

}

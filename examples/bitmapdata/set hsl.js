
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    // game.load.image('pic', 'assets/pics/cougar-face_of_nature.png');
    game.load.image('pic', 'assets/tests/ships.png');

}

var bmd;

function create() {

	game.stage.backgroundColor = '#2d2d2d';

	bmd = game.make.bitmapData(game.cache.getImage('pic').width, game.cache.getImage('pic').height);

	bmd.draw('pic');

	bmd.update();

	game.add.sprite(0, 0, bmd);

	game.input.onDown.add(startProcess, this);

}

function startProcess () {

	//	fixed h
	// bmd.setHSL(0.2);

	//	shift
	// bmd.shiftHSL(0.1);

	// bmd.shiftHSL(0.1, null, null, new Phaser.Rectangle(32, 32, 100, 100));

	//	white hit
	// bmd.shiftHSL(null, null, 1.0);

	//	desaturation
	bmd.shiftHSL(null, -1.0, null);

}

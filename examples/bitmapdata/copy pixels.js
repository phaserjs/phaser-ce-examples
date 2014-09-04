
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pic', 'assets/pics/hotshot-chaos_in_tokyo.png');

}

var bmd;
var area;
var dropTime = 0;

function create() {

	game.stage.backgroundColor = '#2d2d2d';

	bmd = game.make.bitmapData(800, 600);

	bmd.addToWorld();

	area = new Phaser.Rectangle(0, 300, 200, 16);

	bmd.copyRect('pic', area, 300, 0);

}

function update () {

	if (area.y > 0 && game.time.now > dropTime)
	{
		for (var y = 0; y < area.y; y++)
		{
			bmd.copyRect('pic', area, 300, y);
		}

		area.y--;
		dropTime = game.time.now + 25;
	}

}

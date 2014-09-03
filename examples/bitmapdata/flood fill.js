
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pic', 'assets/pics/hotshot-chaos_in_tokyo.png');

}

var bmd;
var area;
var dropTime = 0;

function create() {

	game.stage.backgroundColor = '#2d2d2d';

	bmd = game.make.bitmapData(game.cache.getImage('pic').width, game.cache.getImage('pic').height);

	game.stage.smoothed = false;

	var s = game.add.sprite(game.world.centerX, game.world.centerY, bmd);
	s.anchor.set(0.5);
	s.scale.set(2);

	area = new Phaser.Rectangle(0, bmd.height, bmd.width, 1);
	dropTime = game.time.now + 250;

}

function update () {

	if (area.y > 0 && game.time.now > dropTime)
	{
		for (var y = 0; y < area.y; y++)
		{
			bmd.copyPixels('pic', area, 0, y);
		}

		area.y--;
		dropTime = game.time.now + 25;
	}

}

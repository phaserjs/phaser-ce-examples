
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('wheel', 'assets/pics/color_wheel_swirl.png');

}

var bmd;
var tooltip;
var sprite;

function create() {

	bmd = game.make.bitmapData(800, 600);
	bmd.draw('wheel', -200, -100);
	bmd.update();
	bmd.addToWorld();

	tooltip = game.make.bitmapData(64, 64);
	sprite = game.add.sprite(0, 0, tooltip);

	game.input.addMoveCallback(updateTooltip, this);

}

function updateTooltip (pointer, x, y) {

	if (x >= 0 && x <= bmd.width && y >= 0 && y <= bmd.height)
	{
		var color = bmd.getPixelRGB(x, y);

		tooltip.fill(0, 0, 0);
		tooltip.rect(1, 1, 62, 62, color.rgba);
	
		sprite.x = x;
		sprite.y = y;
	}

}

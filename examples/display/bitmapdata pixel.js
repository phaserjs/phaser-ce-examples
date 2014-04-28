
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

	game.add.sprite(0, 0, bmd);

	tooltip = game.make.bitmapData(64, 64);
	sprite = game.add.sprite(0, 0, tooltip);

	game.input.setMoveCallback(updateTooltip, this);

}

function updateTooltip (pointer, x, y) {

	if (x >= 0 && x <= bmd.width && y >= 0 && y <= bmd.height)
	{
		var color = bmd.getPixelRGB(x, y);

		tooltip.fill(0, 0, 0);
		tooltip.context.fillStyle = color.rgba;
		tooltip.context.fillRect(1, 1, 62, 62);
	
		sprite.x = x;
		sprite.y = y;
	}

}

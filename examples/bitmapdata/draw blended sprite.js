
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('back', 'assets/pics/color_wheel_swirl.png');
    game.load.image('loop', 'assets/particles/leaf2.png');

}

var bmd;
var loop;

function create() {

	//	This is the sprite we're going to be drawing onto the BitmapData
	//	We use game.make because we don't need it displayed, we just need it to exist
	loop = game.make.sprite(0, 0, 'loop');
	loop.anchor.set(0.5);

	//	Note that any properties you set here will be replicated when the Sprite is drawn
	loop.scale.set(0.5);
	loop.alpha = 0.1;

	//	This is the BitmapData we're going to be drawing to
	bmd = game.add.bitmapData(game.width, game.height);
	bmd.addToWorld();

	var bg = game.make.sprite(0, 0, 'back');
	bg.anchor.set(0.5);
	bmd.draw(bg, game.world.centerX, game.world.centerY);

	//	Disables anti-aliasing when we draw sprites to the BitmapData
	// bmd.smoothed = false;

    game.input.addMoveCallback(paint, this);

}

function paint(pointer, x, y) {

	if (pointer.isDown)
	{
	    // draw: function (source, x, y, width, height, blendMode, roundPx) {
		bmd.draw(loop, x, y, null, null, 'saturation');
	}

}

function update() {

	loop.rotation += 0.1;

}
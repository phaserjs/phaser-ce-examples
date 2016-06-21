
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('loop', 'assets/sprites/loop.png');
    game.load.atlas('seacreatures', 'assets/sprites/seacreatures_json.png', 'assets/sprites/seacreatures_json.json');

}

var bmd;
var loop;

function create() {

	//	This is the sprite we're going to be drawing onto the BitmapData
	//	We use game.make because we don't need it displayed, we just need it to exist
	loop = game.make.sprite(0, 0, 'loop');
	loop.anchor.set(0.5);

	//	Note that any properties you set here will be replicated when the Sprite is drawn
	// loop.scale.set(2);

    crab = game.make.sprite(0, 0, 'seacreatures', 'crab10015');

	//	This is the BitmapData we're going to be drawing to
	bmd = game.add.bitmapData(game.width, game.height);
	bmd.addToWorld();

	//	Disables anti-aliasing when we draw sprites to the BitmapData
	bmd.smoothed = false;

	bmd.draw(crab, 10, 10);

    // game.input.addMoveCallback(paint, this);

}

function paint(pointer, x, y) {

	if (pointer.isDown)
	{
		bmd.draw(loop, x, y);
	}

}

function update() {

	loop.rotation += 0.1;

}
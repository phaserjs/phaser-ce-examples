
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {
}

function create() {

	game.stage.backgroundColor = '#003663';

	//	Create our bitmapData which we'll use as a Sprite texture
	var bmd = game.add.bitmapData(32, 32);

	//	Fill it
    var grd = bmd.context.createLinearGradient(0, 0, 0, 32);

    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#004CB3');
    bmd.context.fillStyle = grd;
    bmd.context.fillRect(0, 0, 32, 32);

    //	Put the bitmapData into the cache
    game.cache.addBitmapData('blueShade', bmd);

    //	Now let's make some sprites using this texture, one every second
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //	This one is just for reference (next to the instructions text)
	game.add.sprite(8, 8, game.cache.getBitmapData('blueShade'));

	//	And these move :)
    createBox();

    game.time.events.repeat(Phaser.Timer.SECOND, 20, createBox, this);

    game.input.onDown.add(updateBitmapDataTexture, this);

}

function createBox() {

	var sprite = game.add.sprite(game.world.randomX, game.world.randomY, game.cache.getBitmapData('blueShade'));

    game.physics.arcade.enable(sprite);

    sprite.body.collideWorldBounds = true;
    sprite.body.bounce.set(1);
	sprite.body.velocity.x = game.rnd.realInRange(-200, 200);
	sprite.body.velocity.y = game.rnd.realInRange(-200, 200);

}

function updateBitmapDataTexture() {

	//	Get the bitmapData from the cache. This returns a reference to the original object
	var bmd = game.cache.getBitmapData('blueShade');

	//	Modify it slightly. This has a direct result, because it's a reference to the cached object we don't need to write it back to the cache again

    var grd = bmd.context.createLinearGradient(0, 0, 0, 32);

    grd.addColorStop(0, generateHexColor());
    grd.addColorStop(1, generateHexColor());
    bmd.context.fillStyle = grd;
    bmd.context.fillRect(0, 0, 32, 32);

    //	All sprites using this texture will update at the next render
    bmd.dirty = true;

}

function generateHexColor() { 
	return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
}

function render() {

	game.debug.text('Click to regenerate the texture', 48, 30);

}

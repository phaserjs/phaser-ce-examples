
var game = new Phaser.Game(400, 150, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.image('pic', 'wip/ski.png');
    game.load.image('atari', 'assets/sprites/atari130xe.png');
    game.load.image('mushroom', 'assets/sprites/mushroom2.png');

}

var sprite1;
var sprite2;
var pixelCanvas;
var pixelContext;

function create() {

	pixelCanvas = document.getElementById('pixel');
	pixelContext = pixelCanvas.getContext('2d');

	Phaser.Canvas.setSmoothingEnabled(pixelContext, false);

	var i = game.add.image(0, 0, 'pic');

    sprite1 = game.add.sprite(0, 100, 'mushroom');
    game.physics.enable(sprite1, Phaser.Physics.ARCADE);
    sprite1.body.immovable = true;

    sprite2 = game.add.sprite(400, 100, 'mushroom');
    game.physics.enable(sprite2, Phaser.Physics.ARCADE);
    sprite2.body.velocity.x = -100;

}

function update() {

    game.physics.arcade.collide(sprite1, sprite2);

}

function render() {

	//	Draw the game canvas into the scaled pixel canvas
	pixelContext.drawImage(game.canvas, 0, 0, game.width, game.height, 0, 0, pixelCanvas.width, pixelCanvas.height);

}

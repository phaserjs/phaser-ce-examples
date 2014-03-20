
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

	game.load.spritesheet('gameboy', 'assets/sprites/gameboy_seize_color_40x60.png', 40, 60);

}

var sprite;
var sprite2;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

	game.stage.backgroundColor = '#124184';

	//	Here we're tweening the scale of the sprite, which translates to the scale of the Body as well.
	//	The collision will carry on working even against the scaled body.

	sprite = game.add.sprite(200, 300, 'gameboy', 2);
	sprite.anchor.set(0.5);
	sprite.smoothed = false;

	game.physics.enable(sprite, Phaser.Physics.ARCADE);
	sprite.body.immovable = true;

	sprite2 = game.add.sprite(600, 270, 'gameboy', 3);
	game.physics.enable(sprite2, Phaser.Physics.ARCADE);

	game.add.tween(sprite.scale).to( { x: 3, y: 3 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

}

function update() {

	sprite2.body.velocity.x = -200;

	game.physics.arcade.collide(sprite, sprite2);

}

function render() {

    // game.debug.body(sprite);
    // game.debug.body(sprite2);

}

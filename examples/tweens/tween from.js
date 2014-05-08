
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

	game.load.image('phaser', 'assets/sprites/phaser1.png');

}

var sprite;

function create() {

	game.stage.backgroundColor = '#2384e7';

	//	We position the sprite in the middle of the game
	sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'phaser');
	sprite.anchor.set(0.5);

	//	Then we tween it in from off the top of the game.
	//	It will end up at the middle of the game, as it's tweening FROM the value given below to its current position.
	game.add.tween(sprite).from( { y: -200 }, 2000, Phaser.Easing.Bounce.Out, true);

}

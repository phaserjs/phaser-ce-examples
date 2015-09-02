
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

	game.load.image('phaser', 'assets/sprites/phaser1.png');

}

var sprite;

function create() {

	game.stage.backgroundColor = '#2384e7';

	//	We position the sprite in the middle of the game but off the top
	sprite = game.add.sprite(game.world.centerX, -200, 'phaser');
	sprite.anchor.set(0.5);

	//	Then we tween it in from the bottom of the game.

	//	It will end up at the middle of the game, as it's tweening TO the value given
	game.add.tween(sprite).to( { y: game.world.centerY }, 4000, Phaser.Easing.Bounce.Out, true);

}

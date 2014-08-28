
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

	game.load.image('pic', 'assets/pics/barbarian_loading.png');

}

var pic;

function create() {

	pic = game.add.sprite(game.world.centerX, game.world.centerY, 'pic');
	pic.anchor.set(0.5);

    game.time.events.loop(Phaser.Timer.SECOND * 2, changeTint, this);

}

function changeTint() {

	pic.tint = Math.random() * 0xffffff;

}
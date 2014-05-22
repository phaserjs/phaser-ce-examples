
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('pic', 'assets/wip/bg.png');

}

var bmd;

function create() {

	game.stage.backgroundColor = '#ff0000';

	bmd = game.make.bitmapData(300, 300);

	bmd.draw('pic', 0, 0);

	bmd.update();

	game.add.sprite(0, 0, bmd);


}

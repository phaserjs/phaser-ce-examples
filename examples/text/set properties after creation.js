
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');

}

var text;

function create() {

    text = game.add.bitmapText(0, 100, 'desyrel', "I'm growing", 64);

}

function update() {

	if (text.fontSize < 250)
	{
		text.fontSize += 1;
	}

}

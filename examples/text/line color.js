var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function create() {

	var textGroup = game.add.group();

	for (var i = 0; i < 10; i++)
	{
		textGroup.add(game.make.text(100, 64 + i * 32, 'here is a colored line of text',  { font: "32px Arial", fill: generateHexColor() }));
	}

}

function generateHexColor() { 
    return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
}

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

var textGroup;

function generateHexColor() { 
	return '#' + ((0.5 + 0.5 * Math.random()) * 0xFFFFFF << 0).toString(16);
}

function create() {

	textGroup = game.add.group();

	var style = { font: "32px Arial", fill: "#ff0044", align: "center" };

	for (var i = 0; i < 10; i++)
	{
		style.fill = generateHexColor();
		textGroup.add(game.make.text(100, 64 + i * 32, 'here is a colored line of text',  style));
	}

}
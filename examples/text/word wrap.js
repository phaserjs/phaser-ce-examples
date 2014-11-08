var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

function create() {

    game.stage.backgroundColor = '#0072bc';

	var style = { font: 'bold 60pt Arial', fill: 'white', align: 'left', wordWrap: true, wordWrapWidth: 450 };

    var text = game.add.text(game.world.centerX, game.world.centerY, "phaser with a sprinkle of pixi dust", style);

    text.anchor.set(0.5);

}
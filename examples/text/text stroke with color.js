
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create });

var text;

function create() {

	game.stage.setBackgroundColor(0x2d2d2d);

    text = game.add.text(game.world.centerX, game.world.centerY, '- phaser text stroke -');

    //	Center align
    text.anchor.set(0.5);
    text.align = 'center';

    //	Font style
    text.font = 'Arial Black';
    text.fontSize = 50;
    text.fontWeight = 'bold';

    //	Stroke color and thickness
    text.stroke = '#000000';
    text.strokeThickness = 8;
    text.fill = '#43d637';

    //  And now we'll color in some of the letters
    text.addColor('#ff00ff', 9);
    text.addColor('#43d637', 13);

    //  This allows us to color the stroke instead of the letters
    text.addStrokeColor('#ff0000', 13);
    text.addStrokeColor('#000000', 20);

}

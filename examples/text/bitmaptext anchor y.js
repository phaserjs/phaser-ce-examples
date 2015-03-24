
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');

}

var line1;
var line2;

function create() {

    var text = game.add.bitmapText(400, 300, 'desyrel', 'Middle Earth', 64);
    text.anchor.x = 0.5;
    text.anchor.y = 0.5;

    line1 = new Phaser.Line(400, 0, 400, 600);
    line2 = new Phaser.Line(0, 300, 800, 300);

}

function render() {

    game.debug.geom(line1);
    game.debug.geom(line2);

}

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');

}

var line;

function create() {

    var text1 = game.add.bitmapText(400, 70, 'desyrel', 'Anchor.x = 0', 64);

    var text2 = game.add.bitmapText(400, 270, 'desyrel', 'Anchor.x = 0.5', 64);
    text2.anchor.x = 0.5;

    var text3 = game.add.bitmapText(400, 470, 'desyrel', 'Anchor.x = 1', 64);
    text3.anchor.x = 1;

    line = new Phaser.Line(400, 0, 400, 600);

}

function render() {

    game.debug.geom(line);

}
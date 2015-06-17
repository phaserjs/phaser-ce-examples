
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');

}

var bpmText;

function create() {

    bmpText = game.add.bitmapText(32, 100, 'desyrel', 'abcdef', 48);

    game.input.onDown.addOnce(changeText, this);

}

function changeText() {

    bmpText.text = "ghi";

    game.input.onDown.addOnce(changeText2, this);

}

function changeText2() {

    bmpText.text = "jklmnop";

}

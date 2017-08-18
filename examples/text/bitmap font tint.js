
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');

}

var clicks = 0;
var bmpText;

function create() {

    bmpText = game.add.bitmapText(100, 200, 'desyrel', 'Click me', 64);

    bmpText.inputEnabled = true;

    bmpText.events.onInputDown.add(down, this);

}

function down(item) {

    clicks++;

    item.tint = Math.floor(Math.random() * 0xffffff);

    item.text = 'You clicked ' + clicks + ' times';


}

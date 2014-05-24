
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('knightPink', 'assets/demoscene/knighthawks.png');

}

var font;
var extracted;

function create() {

    //  The two BitmapData objects we'll use, one contains the image (font), the other the extracted pixels
    font = game.make.bitmapData();
    extracted = game.make.bitmapData();

    //  Load the image into the first BitmapData
    font.load('knightPink');

    //  Extract all pixels matching R: 237, G: 0, B: 140 from the font BitmapData and draw them into 'extracted'
    //  255 is the alpha value to draw the new pixels as
    //  'true' tells the extracted BitmapData to resize itself to match the dimensions of 'font' before copying
    font.extract(extracted, 237, 0, 140, 255, true);

    //  Display them so we can see what's happened
    game.add.image(0, 0, font);
    game.add.image(320, 0, extracted);

}

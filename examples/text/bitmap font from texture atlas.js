
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    //  The Texture Atlas the font is in
    game.load.atlas('atlas', 'assets/sprites/atlas-mixed.png', 'assets/sprites/atlas-mixed.json');

    //  The Bitmap Font data file
    game.load.xml('fontData', 'assets/fonts/bitmapFonts/desyrel.xml');

}

var bmpText;

function create() {

    game.cache.addBitmapFontFromAtlas('myFont', 'atlas', 'desyrel', 'fontData', 'xml', 0, 0);

    //  The Bitmap Text
    bmpText = game.add.bitmapText(0, 100, 'myFont', 'A Bitmap Font\nfrom a Texture Atlas', 64);

    bmpText.align = 'center';
    bmpText.centerX = 400;

    //  A sprite from the same atlas
    var ball = game.add.sprite(0, 100, 'atlas', 'wizball');

    game.physics.arcade.enable(ball);

    ball.body.bounce.set(1);
    ball.body.collideWorldBounds = true;
    ball.body.velocity.set(200, 100);
    ball.body.gravity.y = 200;

}

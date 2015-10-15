
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pic', 'assets/pics/thalion-rain.png');
    game.load.video('space', 'assets/video/alpha-webm.webm');
    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');

}

var video;
var text;

function create() {

    //  This only works in Chrome
    //  No other browser supports webm files with alpha transparency (yet)

    var pic = game.add.image(400, 300, 'pic');
    pic.anchor.set(0.5);
    pic.scale.set(4);
    pic.smoothed = false;

    text = game.add.bitmapText(400, 300, 'desyrel', 'Phaser\nAlpha Videos', 64);
    text.anchor.set(0.5);
    text.align = 'center';

    video = game.add.video('space');

    video.play(true);

    video.addToWorld(400, 300, 0.5, 0.5);

}

function update() {

    text.text = 'Phaser kicking\nAlpha Video Channels\n' + Math.round(video.progress * 100) + '%';

}

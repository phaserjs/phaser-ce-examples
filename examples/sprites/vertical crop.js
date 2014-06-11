
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create , update : update});

function preload() {
    game.load.image('trsi', 'assets/pics/trsipic1_lazur.jpg');
}

var pic;
var cropRect;

function create() {

    pic = game.add.sprite(game.world.centerX, 550, 'trsi');

    pic.anchor.setTo(0.5, 1);

    cropRect = new Phaser.Rectangle(0, 0, pic.width, 0);

    //	Here we'll tween the crop rect, from a height of zero to full height, and back again
    var tween = game.add.tween(cropRect).to( { height: pic.height }, 3000, Phaser.Easing.Bounce.Out, false, 0, 1000, true);

    pic.crop(cropRect);

    tween.start();

}

function update () {

    pic.updateCrop();

}

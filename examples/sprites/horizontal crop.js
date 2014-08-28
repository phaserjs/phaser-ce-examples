
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update : update });

function preload() {
    game.load.image('trsi', 'assets/pics/trsipic1_lazur.jpg');
}

var pic;
var cropRect;

function create() {

    pic = game.add.image(game.world.centerX, 550, 'trsi');

    pic.anchor.setTo(0.5, 1);

    cropRect = new Phaser.Rectangle(0, 0, 0, pic.height);

    console.log(cropRect);

    // Here we'll tween the crop rect, from a width of zero to full width, and back again
    var tween = game.add.tween(cropRect).to( { width: pic.width }, 3000, Phaser.Easing.Bounce.Out, false, 0, 1000, true);

    pic.crop(cropRect);

    tween.start();

}

function update () {

    pic.updateCrop();

}

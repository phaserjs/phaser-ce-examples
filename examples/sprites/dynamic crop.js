
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('trsi', 'assets/pics/trsipic1_lazur.jpg');

}

var pic;
var cropRect;
var w;
var h;

function create() {

    pic = game.add.sprite(0, 0, 'trsi');

    w = pic.width;
    h = pic.height;

    cropRect = new Phaser.Rectangle(0, 0, 128, 128);

    pic.crop(cropRect);

}

function update() {

    if (game.input.x < w && game.input.y < h)
    {
        pic.x = game.input.x;
        pic.y = game.input.y;
        cropRect.x = game.input.x;
        cropRect.y = game.input.y;

        pic.updateCrop();
    }

}

function render() {

    game.debug.text('x: ' + game.input.x + ' y: ' + game.input.y, 32, 32);

}

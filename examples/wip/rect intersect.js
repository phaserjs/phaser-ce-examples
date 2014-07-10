
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var cropRect;
var fakeImage;
var irect;

function preload() {
}

function create() {

    fakeImage = new Phaser.Rectangle(0, 0, 320, 240);

    cropRect = new Phaser.Rectangle(0, 100, 320, 50);
    
    irect = Phaser.Rectangle.intersection(cropRect, fakeImage);

}

function update() {


}

function render() {

    game.debug.geom(fakeImage, 'rgba(0,255,0,0.3)');
    game.debug.geom(cropRect, 'rgba(255,0,0,0.3)');
    game.debug.geom(irect, 'rgba(255,255,0,1)');

}

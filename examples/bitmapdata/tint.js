
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('crystal', 'assets/pics/cougar_dragonsun.png');

}

var bmd;

function create() {

    var pic = game.make.image(0, 0, 'crystal');

    bmd = game.make.bitmapData(pic.width, pic.height);

    PIXI.CanvasTinter.tintMethod(pic.texture, 0xee4343, bmd.canvas);

    bmd.addToWorld();

}

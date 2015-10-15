
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('pic', 'assets/pics/Equality_by_Ragnarok.png');

}

var bmd;
var bmd2;

function create() {

    game.stage.backgroundColor = '#2d2d2d';

    bmd = game.make.bitmapData(800, 600);
    bmd.copy('pic');
    bmd.addToWorld();

    bmd2 = game.make.bitmapData(64, 64);
    bmd2.circle(32, 32, 32, 'rgba(255,0,255,0.2)');

    game.input.addMoveCallback(paint, this);

}

function paint(pointer, x, y) {

    if (pointer.isDown)
    {
        bmd.draw(bmd2, x - 16, y - 16);
    }

}

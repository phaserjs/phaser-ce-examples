
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('raster', 'assets/demoscene/rastercarpet.png');

}

var bmd;
var fx;

function create() {

    bmd = game.make.bitmapData(480, 480);

    for (var i = 0; i < 480; i++)
    {
        bmd.draw('raster', 0, i);
    }

    fx = game.make.bitmapData(640, 480);
    fx.addToWorld();

}

var sx = 0;
var step = 3;
// var speed = 0.01;
var speed = 0.1;

function update() {

    fx.cls();

    for (var i = 0; i < 30; i++)
    {
        var x = i * 16;
        // var x = 0;
        var y = 0;
        var w = (i * 16) + 16;
        var h = 480 - (i * 16);

        var tx = 200 + Math.sin(sx) * i * 6;
        // var tx = 32 + Math.sin(sx + (i * step * 2)) * 32;
        var ty = i * 2;

        // var x = i * 16;
        // var y = i * 2;
        // var w = (i * 16) + 16;
        // var h = 480 - (i * 2);

        // var tx = 290 + Math.sin(sx + (i * step * 2)) * 15;
        // var ty = i * 2;

        // var tx = 290 + Math.sin(sx + (i * step * 2)) * 150;

        var alpha = 1;
        var blendMode = null;
        var roundPx = true;

        fx.copy(bmd, x, y, w, h, tx, ty, w, h, 0, 0, 0, 1, 1, alpha, blendMode, roundPx);
    }

    sx += speed;

}

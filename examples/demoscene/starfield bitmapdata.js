
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var distance = 300;
var speed = 6;
var max = 500;

var canvas;

var xx = [];
var yy = [];
var zz = [];

function preload() {

    game.load.image('star', 'assets/demoscene/star2.png');

}

function create() {

    canvas = game.add.bitmapData(800, 600);
    canvas.addToWorld();

    for (var i = 0; i < max; i++)
    {
        xx[i] = Math.floor(Math.random() * 800) - 400;
        yy[i] = Math.floor(Math.random() * 600) - 300;
        zz[i] = Math.floor(Math.random() * 1700) - 100;
    }

}

function update() {

    canvas.clear();

    for (var i = 0; i < max; i++)
    {
        var perspective = distance / (distance - zz[i]);
        var x = game.world.centerX + xx[i] * perspective;
        var y = game.world.centerY + yy[i] * perspective;

        zz[i] += speed;

        if (zz[i] > 300)
        {
            zz[i] -= 600;
        }

        //  Swap this for a standard drawImage call
        canvas.draw('star', x, y);
    }

}

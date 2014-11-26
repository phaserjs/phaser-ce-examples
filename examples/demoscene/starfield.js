
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('tinystar', 'assets/demoscene/star2.png');

}

var distance = 300;
var speed = 6;
var star;
var texture;

var max = 400;
var xx = [];
var yy = [];
var zz = [];

function create() {

    star = game.make.sprite(0, 0, 'tinystar');
    texture = game.add.renderTexture(800, 600, 'texture');

    game.add.sprite(0, 0, texture);

    for (var i = 0; i < max; i++)
    {
        xx[i] = Math.floor(Math.random() * 800) - 400;
        yy[i] = Math.floor(Math.random() * 600) - 300;
        zz[i] = Math.floor(Math.random() * 1700) - 100;
    }

}

function update() {

    texture.clear();

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

        texture.renderXY(star, x, y);
    }

}

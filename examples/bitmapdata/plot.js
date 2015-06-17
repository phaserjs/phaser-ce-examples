
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var star;
var texture1;
var data = { res: 6, pow: 10000, angle: 0.1, height: 6 };

function preload() {

    game.load.image('star', 'assets/sprites/chunk.png');
    // game.load.image('star', 'assets/sprites/jets.png');

}

function create() {

    star = game.make.sprite(0, 0, 'star');

    texture1 = game.add.renderTexture(800, 600, 'texture1');

    game.add.sprite(0, 0, texture1);

    game.add.tween(data).to( { height: 12 }, 3000, "Sine.easeInOut", true, 4000, -1, true);
    game.add.tween(data).to( { angle: 1.0 }, 4000, "Linear", true, 0, -1, true);
 
}

function plot() {

    texture1.clear();

    for (var x = -100; x <= 100; x += 2)
    {
        var v = data.res * Math.floor(Math.sqrt((data.pow) - x * x) / data.res);

        for (var y = v; y > -v; y -= data.res)
        {
            var z = (32 * Math.sin(Math.sqrt(x * x + y * y) / data.height)) + data.angle * y;

            var drawX = 400 + Math.floor(x * 3);
            var drawY = 300 + Math.floor(z * 2);

            texture1.renderRawXY(star, drawX, drawY, false);
        }
    }

}

function update() {

    plot();
 
}
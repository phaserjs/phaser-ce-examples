
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

var bmd;
var data = { res: 5, pow: 10000, angle: 0.1, height: 6 };

function create() {

    //  Our BitmapData (same size as our canvas)
    bmd = game.make.bitmapData(800, 600);

    bmd.addToWorld();

    bmd.context.fillStyle = 'rgba(255,255,0,0.5)';

    game.add.tween(data).to( { height: 12 }, 4000, "Sine.easeInOut", true, 6000, -1, true);
    game.add.tween(data).to( { angle: 1.0 }, 6000, "Linear", true, 0, -1, true);
 
}

function plot() {

    bmd.clear();

    for (var x = -100; x <= 100; x++)
    {
        var v = data.res * Math.floor(Math.sqrt((data.pow) - x * x) / data.res);

        for (var y = v; y > -v; y -= data.res)
        {
            var z = (32 * Math.sin(Math.sqrt(x * x + y * y) / data.height)) + data.angle * y;

            var drawX = 400 + Math.floor(x * 3);
            var drawY = 300 + Math.floor(z * 2);

            bmd.rect(drawX, drawY, 4, 4);
        }
    }

}

function update() {

    plot();
 
}
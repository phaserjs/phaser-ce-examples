
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

var bmd;
var lines;

var colors;
var i = 0;
var p = null;

function create() {

    colors = Phaser.Color.HSVColorWheel();

    //  Create some Lines, we'll store them in this array
    lines = [];

    for (var c = 0; c < 50; c++)
    {
        lines.push(new Phaser.Line(game.world.randomX, game.world.randomY, game.world.randomX, game.world.randomY));
    }

    //  Create a BitmapData just to plot to
    bmd = game.add.bitmapData(game.width, game.height);
    bmd.addToWorld();

    //  We'll re-use this point object for the plot
    p = new Phaser.Point();

}

function update () {

    //  Plot pixels against the lines

    for (var c = 0; c < lines.length; c++)
    {
        lines[c].random(p);

        //  We'll floor it as setPixel needs integer values and random returns floats
        p.floor();

        bmd.setPixel(p.x, p.y, colors[i].r, colors[i].g, colors[i].b);
    }
    
    i = game.math.wrapValue(i, 1, 359);

}


var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

var bmd;
var rectangle;

var colors;
var i = 0;
var p = null;

function create() {

    colors = Phaser.Color.HSVColorWheel();

    //  Create a Rectangle
    rectangle = new Phaser.Rectangle(100, 200, 600, 200);

    //  Create a BitmapData just to plot the points to
    bmd = game.add.bitmapData(game.width, game.height);
    bmd.addToWorld();

    p = new Phaser.Point();

}

function update () {

    for (var c = 0; c < 10; c++)
    {
        rectangle.random(p);

        //  We'll floor it as setPixel needs integer values and random returns floats
        p.floor();

        bmd.setPixel(p.x, p.y, colors[i].r, colors[i].g, colors[i].b);
    }
    
    i = game.math.wrapValue(i, 1, 359);

}

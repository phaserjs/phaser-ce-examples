
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

var bmd;
var circle;

var colors;
var i = 0;
var p = null;

function create() {

    colors = Phaser.Color.HSVColorWheel();

    //  Create a Circle
    circle = new Phaser.Circle(game.world.centerX, game.world.centerY, 500);

    //  Create a BitmapData just to plot Circle points to
    bmd = game.add.bitmapData(game.width, game.height);
    bmd.addToWorld();

    //  And display our circle on the top
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(1, 0x00ff00, 1);
    graphics.drawCircle(circle.x, circle.y, circle.diameter);

    p = new Phaser.Point();

}

function update () {

    for (var c = 0; c < 10; c++)
    {
        circle.random(p);

        //  We'll floor it as setPixel needs integer values and random returns floats
        p.floor();

        bmd.setPixel(p.x, p.y, colors[i].r, colors[i].g, colors[i].b);
    }
    
    i = game.math.wrapValue(i, 1, 359);

}

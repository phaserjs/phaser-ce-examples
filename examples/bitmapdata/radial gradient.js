
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create, update: update });

var bmd;
var innerCircle;
var outerCircle;

function create() {

    //  Our BitmapData (same size as our canvas)
    bmd = game.make.bitmapData(800, 600);

    //  Add it to the world or we can't see it
    bmd.addToWorld();

    //  Create the Circles
    innerCircle = new Phaser.Circle(200, 200, 100);
    outerCircle = new Phaser.Circle(200, 200, 300);

    game.add.tween(innerCircle).to( { x: 100, y: 100, radius: 1 }, 3000, "Sine.easeInOut", true, 0, -1, true);

}

function update() {

    var grd = bmd.context.createRadialGradient(innerCircle.x, innerCircle.y, innerCircle.radius, outerCircle.x, outerCircle.y, outerCircle.radius);
    grd.addColorStop(0, '#8ED6FF');
    grd.addColorStop(1, '#003BA2');

    bmd.cls();
    bmd.circle(outerCircle.x, outerCircle.y, outerCircle.radius, grd);

}
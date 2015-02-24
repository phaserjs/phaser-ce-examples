
var game = new Phaser.Game(800, 600, Phaser.WEBGL, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('logo', 'assets/sprites/phaser2.png');
    
}

var logo;
var text;
var tween;
var method = 0;

function create() {

    logo = this.add.sprite(0, 0, 'logo');
    logo.scale.set(0.5);

    var style = { font: "48px Arial", fill: "#ff0044", align: "center" };
    text = game.add.text(game.world.centerX, game.world.centerY, "Linear Interpolation", style);
    text.anchor.set(0.5);

    var w = game.width - logo.width;
    var h = game.height - logo.height;

    //  You can tween between an array of values by defining an array as the destination value
    //  It will tween through them using the interpolation function (default is linear)
    //  The -1 at the end just makes the tween repeat forever.

    tween = game.add.tween(logo).to( { x: [ w, w, 0, 0 ], y: [ 0, h, h, 0 ] }, 4000, "Sine.easeInOut", true, -1, false);

    tween.onLoop.add(changeMethod, this);

}

function changeMethod() {

    method++;

    if (method === 1)
    {
        tween.interpolation(Phaser.Math.bezierInterpolation);
        text.text = "Bezier Interpolation";
    }
    else if (method === 2)
    {
        tween.interpolation(Phaser.Math.catmullRomInterpolation);
        text.text = "CatmullRom Interpolation";
    }
    else if (method === 3)
    {
        method = 0;
        tween.interpolation(Phaser.Math.linearInterpolation);
        text.text = "Linear Interpolation";
    }

}
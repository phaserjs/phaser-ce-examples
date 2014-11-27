
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pic', 'assets/pics/jim_sachs_time_crystal.png');

}

var slices;
var waveform;

var xl;
var cx = 0;

function create() {

    game.stage.backgroundColor = '#0055ff';

    //  Generate our motion data
    var motion = { x: 0 };
    var tween = game.add.tween(motion).to( { x: 200 }, 3000, "Bounce.easeInOut", true, 0, -1, true);
    waveform = tween.generateData(60);

    xl = waveform.length - 1;

    slices = [];

    var picWidth = game.cache.getImage('pic').width;
    var picHeight = game.cache.getImage('pic').height;

    var ys = 4;

    for (var y = 0; y < Math.floor(picHeight/ys); y++)
    {
        var star = game.add.sprite(300, 100 + (y * ys), 'pic');

        star.crop(new Phaser.Rectangle(0, y * ys, picWidth, ys));

        star.ox = star.x;

        star.cx = game.math.wrap(y * 2, 0, xl);

        star.anchor.set(0.5);
        slices.push(star);
    }

}

function update() {

    for (var i = 0, len = slices.length; i < len; i++)
    {
        slices[i].x = slices[i].ox + waveform[slices[i].cx].x;

        slices[i].cx++;

        if (slices[i].cx > xl)
        {
            slices[i].cx = 0;
        }

    }

}

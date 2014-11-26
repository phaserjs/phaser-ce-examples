
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('star', 'assets/demoscene/block.png');
    game.load.image('pic', 'assets/pics/jim_sachs_time_crystal.png');

}

var stars;
var waveformX;
var waveformY;

var xl;
var yl;

var cx = 0;
var cy = 0;

function create() {

    game.stage.backgroundColor = '#0055ff';

    //  Generate our motion data
    var sprite = { x: 0, y: 1 };
    var tween = game.add.tween(sprite).to( { x: 132, y: 16 }, 2000, "Elastic.easeInOut", true, 0, -1, true);
    waveform = tween.generateData(60);

    xl = waveform.length - 1;
    yl = waveform.length - 1;

    var sprites = game.add.spriteBatch();

    stars = [];

    var picWidth = game.cache.getImage('pic').width;
    var picHeight = game.cache.getImage('pic').height;

    var ys = 4;

    for (var y = 0; y < Math.floor(picHeight/ys); y++)
    {
        var star = game.make.sprite(300, 100 + (y * ys), 'pic');

        star.crop(new Phaser.Rectangle(0, y * ys, picWidth, ys));

        star.ox = star.x;
        star.oy = star.y;

        star.cx = game.math.wrap(y, 0, xl);
        star.cy = y;

        star.anchor.set(0.5);
        sprites.addChild(star);
        stars.push(star);
    }

}

function update() {

    for (var i = 0, len = stars.length; i < len; i++)
    {
        stars[i].x = stars[i].ox + waveform[stars[i].cx].x;
        stars[i].y = stars[i].oy + waveform[stars[i].cy].y;

        stars[i].cx++;

        if (stars[i].cx > xl)
        {
            stars[i].cx = 0;
        }

        stars[i].cy++;

        if (stars[i].cy > yl)
        {
            stars[i].cy = 0;
        }

    }

}

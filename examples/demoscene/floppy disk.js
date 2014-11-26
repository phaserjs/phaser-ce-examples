
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('star', 'assets/demoscene/block.png');
    game.load.image('pic', 'assets/pics/devilstar_demo_download_disk.png');

}

var stars;
var waveformX;
var waveformY;

var xl;
var yl;

var cx = 0;
var cy = 0;

function create() {

    //  Generate our motion data
    var sprite = { x: 256, y: 0 };
    var tween = game.add.tween(sprite).to( { x: 0 }, 3000, "Cubic.easeInOut", true, 0, -1, true);
    var tween2 = game.add.tween(sprite).to( { y: 200 }, 2000, "Bounce.easeInOut", true, 0, -1, true);

    waveformX = tween.generateData(60);
    waveformY = tween2.generateData(60);

    xl = waveformX.length - 1;
    yl = waveformY.length - 1;

    var sprites = game.add.spriteBatch();

    stars = [];

    var picWidth = game.cache.getImage('pic').width;
    var picHeight = game.cache.getImage('pic').height;

    //  Divide it into 16x10 chunks

    var xs = 32;
    var ys = 16;

    for (var y = 0; y < Math.floor(picHeight/ys); y++)
    {
        for (var x = 0; x < Math.floor(picWidth/xs); x++)
        {
            var star = game.make.sprite(150 + (x * xs), 50 + (y * ys), 'pic');

            star.crop(new Phaser.Rectangle(x * xs, y * ys, xs * 1.5, ys * 1.6));

            star.ox = star.x;
            star.oy = star.y;

            star.cx = x;
            star.cy = y;

            star.anchor.set(0.5);
            sprites.addChild(star);
            stars.push(star);
        }
    }

}

function update() {

    for (var i = 0, len = stars.length; i < len; i++)
    {
        stars[i].x = stars[i].ox + waveformX[stars[i].cx].x;
        stars[i].y = stars[i].oy + waveformY[stars[i].cy].y;

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

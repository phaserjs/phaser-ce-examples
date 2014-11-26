
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('star', 'assets/demoscene/star3.png');

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
    var sprite = { x: 0, y: -64 };
    var tween = game.add.tween(sprite).to( { x: 128 }, 4000, "Bounce.easeIn", true, 0, -1, true);
    var tween2 = game.add.tween(sprite).to( { y: 128 }, 4000, "Bounce.easeOut", true, 0, -1, false);

    waveformX = tween.generateData(60);
    waveformY = tween2.generateData(60);

    xl = waveformX.length - 1;
    yl = waveformY.length - 1;

    var sprites = game.add.spriteBatch();

    stars = [];

    var xs = 28;
    var ys = 32;

    for (var y = 0; y < 18; y++)
    {
        for (var x = 0; x < 28; x++)
        {
            var star = game.make.sprite((x * xs), (y * ys), 'star');

            star.ox = star.x;
            star.oy = star.y;

            star.cx = game.rnd.between(0, xl);
            star.cy = game.rnd.between(0, yl);

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

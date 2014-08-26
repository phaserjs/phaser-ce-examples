var game = new Phaser.Game(1022, 466, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('picLady', 'wip/mosaic_rough_for_richard_lady.jpg');
    game.load.image('picMan', 'wip/mosaic_rough_for_richard_man.jpg');

}

var tileWidth = 14;
var tileHeight = 19;

var bmdSourceA;
var bmdSourceB;
var bmdDest;

var w = 0;
var h = 0;
var remaining = 0;

var sequence = [];
var times = [];
var running = false;

function create() {

    //  bmd approach

    //  From the LADY (source) into the MAN (dest)

    w = game.width / tileWidth;
    h = game.height / tileHeight;

    //  Source images

    bmdSourceA = game.make.bitmapData(game.width, game.height);
    bmdSourceA.draw('picLady');

    bmdSourceB = game.make.bitmapData(game.width, game.height);
    bmdSourceB.draw('picMan');

    //  This one is displayed on-screen
    bmdDest = game.make.bitmapData(game.width, game.height);
    bmdDest.draw(bmdSourceA);

    // var total = w * h;
    var duration = 2000;
    var delay = 0;

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {
            duration = game.rnd.between(1000, 20000);
            // delay = game.rnd.between(0, 2500);

            sequence.push( { alpha: 0, rect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, tileWidth, tileHeight) } );
            times.push( { start: 0, end: 0, duration: duration, inc: 0, delay: delay, started: false, finished: false });
        }
    }

    //  if we shuffle this we'll get some interesting effects :)
    // inc = Phaser.Utils.shuffle(inc);

    game.add.image(0, 0, bmdDest);

    game.input.onDown.addOnce(start, this);

}

function start() {

    console.log('draw start - updating', times.length);

    for (var i = 0; i < times.length; i++)
    {
        times[i].start = game.time.now + times[i].delay;
        times[i].end = times[i].start + times[i].duration;
        times[i].inc = 1 / ((times[i].duration / 1000) * 60); // assumes 60fps
    }

    running = true;

}

function update() {

    if (running)
    {
        draw();
    }

}

function draw() {

    remaining = 0;

    for (var i = 0; i < times.length; i++)
    {
        if (times[i].finished === false)
        {
            remaining++;
        }
    }

    if (remaining === 0)
    {
        running = false;
        console.log('draw over');
        bmdDest.clear();
        bmdDest.draw(bmdSourceB);
        return;
    }

    bmdDest.clear();
    bmdDest.draw(bmdSourceA);

    for (var i = 0; i < sequence.length; i++)
    {
        //  We need to copy the chunk even after finishing
        if (times[i].started)
        {
            if (sequence[i].alpha < 1)
            {
                sequence[i].alpha += times[i].inc;
            }

            // bmdDest.copyPixels(bmdSourceB, sequence[i].rect, sequence[i].rect.x, sequence[i].rect.y);
            // bmdDest.copyPixels(bmdSourceA, sequence[i].rect, sequence[i].rect.x, sequence[i].rect.y, sequence[i].alpha);
            bmdDest.copyPixels(bmdSourceB, sequence[i].rect, sequence[i].rect.x, sequence[i].rect.y, sequence[i].alpha);

            if (sequence[i].alpha >= 1)
            {
                times[i].finished = true;
            }
        }
        else
        {
            // if (times[i].started === false && game.time.now >= times[i].start)
            if (game.time.now >= times[i].start)
            {
                times[i].started = true;
            }
        }
    }

}

function render() {

    game.debug.geom(new Phaser.Rectangle(0, 0, 160, 24), 'rgba(0,0,0,0.7)');
    game.debug.text("Remaining: " + remaining, 8, 14);

}

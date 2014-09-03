var game = new Phaser.Game(1022, 466, Phaser.CANVAS, 'fx', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pic1', 'mosaic_rough_for_richard_lady.jpg');
    game.load.image('pic2', 'mosaic_rough_for_richard_man.jpg');
    game.load.image('pic3', 'pic1.jpg');
    game.load.image('pic4', 'pic2.jpg');

}

var bmdSourceA;
var bmdSourceB;
var bmdDest;

var w = 0;
var h = 0;

var times = [];
var data;

var s1 = "pic1";
var s2 = "pic2";

var r1;

var running = false;

function create() {

    //  Source images

    bmdSourceA = game.make.bitmapData(game.width, game.height);
    bmdSourceA.draw(s1);

    bmdSourceB = game.make.bitmapData(game.width, game.height);
    bmdSourceB.draw(s2);

    //  This one is displayed on-screen
    bmdDest = game.make.bitmapData(game.width, game.height);
    bmdDest.draw(bmdSourceA);

    game.add.image(0, 0, bmdDest);

    reset();

    delay = 0;

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {
            data.push(game.make.tween( { s: 0, rotate: 0 } ).to( { s: 1, rotate: 360 }, 1000, Phaser.Easing.Linear.None).generateData(60));

            times.push( { start: game.time.now + delay, i: 0, started: false, finished: false, step: 1 });

            delay += 10;
        }
    }

    game.input.onDown.add(function() { running = true; });

}

function update() {

    if (running)
    {
        bmdDest.cls();
        bmdDest.draw(bmdSourceA);

        var entity = 0;

        for (var y = 0; y < h; y++)
        {
            for (var x = 0; x < w; x++)
            {
                var i = times[entity].i;
                var d = data[entity][i];

                r1.x = x * tileWidth;
                r1.y = y * tileHeight;

                if (!times[entity].started && game.time.now >= times[entity].start)
                {
                    times[entity].started = true;
                }

                if (times[entity].started)
                {
                    if (times[entity].finished)
                    {
                        bmdDest.fastCopy(bmdSourceB, r1, r1.x + (tileWidth / 2), r1.y + (tileHeight / 2));
                    }
                    else
                    {
                        // bmdDest.fastCopy(bmd, r, game.world.centerX, game.world.centerY, data.r, 0.5, 0.5, data.s, data.s, 0.7);
                        bmdDest.fastCopy(bmdSourceB, r1, r1.x + (tileWidth / 2), r1.y + (tileHeight / 2), d.rotate, 0.5, 0.5, d.s, d.s);
    
                        times[entity].i += times[entity].step;

                        if (times[entity].i >= data[entity].length - 1)
                        {
                            times[entity].finished = true;
                        }
                    }
                }

                entity++;
            }
        }
    }

}

function reset(tw, th) {

    if (typeof tw === 'undefined') { tw = tileWidth; }
    if (typeof th === 'undefined') { th = tileHeight; }

    tileWidth = tw;
    tileHeight = th;

    sequence = [];
    times = [];
    data = [];

    w = game.width / tileWidth;
    h = game.height / tileHeight;

    r1 = new Phaser.Rectangle(0, 0, tileWidth, tileHeight);
    r2 = new Phaser.Rectangle(0, 0, tileWidth, tileHeight);

}

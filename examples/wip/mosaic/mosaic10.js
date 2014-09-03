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
var direction = 0;

var data;
var times;

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

}

function update() {

    if (!running)
    {
        return;
    }

    var remaining = 0;

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
        console.log('Draw over');
        bmdDest.clear();
        bmdDest.draw(bmdSourceB);

        if (direction === 0)
        {
            direction = 1;
            bmdSourceA.draw(s2);
            bmdSourceB.draw(s1);
        }
        else
        {
            direction = 0;
            bmdSourceA.draw(s1);
            bmdSourceB.draw(s2);
        }

        return;
    }

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
                var d = data[i];

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
                        bmdDest.fastCopy(bmdSourceB, r1, r1.x + (tileWidth / 2), r1.y + (tileHeight / 2), d.rotate, 0.5, 0.5, d.scale, d.scale, d.alpha);
    
                        times[entity].i += times[entity].step;

                        if (times[entity].i >= data.length - 1)
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

function reset() {

    times = [];
    data = [];

    w = game.width / tileWidth;
    h = game.height / tileHeight;

    r1 = new Phaser.Rectangle(0, 0, tileWidth, tileHeight);

}

function start() {

    if (running)
    {
        return;
    }

    console.log('Draw start');

    reset();

    data = game.make.tween( { alpha: 0, scale: 0, rotate: 0 } ).to( { alpha: 1, scale: 1, rotate: 360 }, $('#duration').val(), Phaser.Easing.Linear.None).generateData(60);

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {
            delay = game.rnd.between($('#delayMin').val(), $('#delayMax').val());
            times.push( { start: game.time.now + delay, i: 0, started: false, finished: false, step: 1 });
        }
    }

    running = true;

}

function togglePics() {

    if (running)
    {
        return;
    }

    if (s1 === 'pic1')
    {
        s1 = 'pic3';
        s2 = 'pic4';
    }
    else
    {
        s1 = 'pic1';
        s2 = 'pic2';
    }

    if (direction === 0)
    {
        bmdSourceA.draw(s1);
        bmdSourceB.draw(s2);
        bmdDest.draw(bmdSourceA);
    }
    else
    {
        bmdSourceA.draw(s1);
        bmdSourceB.draw(s2);
        bmdDest.draw(bmdSourceB);
    }

}

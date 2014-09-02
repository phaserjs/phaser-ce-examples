var game = new Phaser.Game(1022, 466, Phaser.CANVAS, 'fx', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pic1', 'mosaic_rough_for_richard_lady.jpg');
    game.load.image('pic2', 'mosaic_rough_for_richard_man.jpg');
    game.load.image('pic3', 'pic1.jpg');
    game.load.image('pic4', 'pic2.jpg');

}

// var tileWidth = 14;
// var tileHeight = 19;

var bmdSourceA;
var bmdSourceB;
var bmdDest;

var direction = 0;

var w = 0;
var h = 0;
var remaining = 0;

var sequence = [];
var times = [];
var running = false;

var s1 = "pic1";
var s2 = "pic2";

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

    game.input.onDown.add(start, this);

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

    bmdSourceA.draw(s1);
    bmdSourceB.draw(s2);
    bmdDest.draw(bmdSourceA);

}

function reset() {

    sequence = [];
    times = [];
    w = game.width / tileWidth;
    h = game.height / tileHeight;

}

function setup1() {

    console.log('setup1');

    reset();

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {
            duration = game.rnd.between($('#durationMin').val(), $('#durationMax').val());
            delay = game.rnd.between($('#delayMin').val(), $('#delayMax').val());

            sequence.push( { alpha: 0, rect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, tileWidth, tileHeight) } );
            times.push( { start: 0, end: 0, duration: duration, inc: 0, delay: delay, started: false, finished: false });
        }
    }

}

function setup2() {

    console.log('setup2');

    reset();

    duration = game.rnd.between($('#durationMin').val(), $('#durationMax').val());
    delay = game.rnd.between($('#delayMin').val(), $('#delayMax').val());

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {
            sequence.push( { alpha: 0, rect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, tileWidth, tileHeight) } );
            times.push( { start: 0, end: 0, duration: duration, inc: 0, delay: delay, started: false, finished: false });
        }

        delay += 100;
    }

}

function setup3() {

    console.log('setup3');

    reset();
    var delay = 0;

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {
            duration = game.rnd.between($('#durationMin').val(), $('#durationMax').val());

            sequence.push( { alpha: 0, rect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, tileWidth, tileHeight) } );
            times.push( { start: 0, end: 0, duration: duration, inc: 0, delay: delay, started: false, finished: false });
        }

        //  Looks great!
        delay += 50;
    }

}

function setup4() {

    console.log('setup4');

    reset();
    var delay = 0;
    // duration = 2000;

    // duration = game.rnd.between($('#durationMin').val(), $('#durationMax').val());
    // delay = game.rnd.between($('#delayMin').val(), $('#delayMax').val());
    // duration = game.rnd.between($('#durationMin').val(), $('#durationMax').val());

    duration = 500;

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {

            // sequence.push( { alpha: 0, rect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, tileWidth, tileHeight), drawRect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, tileWidth, tileHeight) } );
            sequence.push( { alpha: 0, rect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, tileWidth, tileHeight), drawRect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, 0, 0) } );

            times.push( { start: 0, end: 0, duration: duration, inc: 0, delay: delay, started: false, finished: false });
        }
    }

}

function start() {

    switch (effect)
    {
        case 1: setup1(); break;
        case 2: setup2(); break;
        case 3: setup3(); break;
        case 4: setup4(); break;
    }

    if (running)
    {
        return;
    }

    console.log('Draw start');

    for (var i = 0; i < times.length; i++)
    {
        sequence[i].alpha = 0;
        times[i].started = false;
        times[i].finished = false;
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

    bmdDest.clear();
    bmdDest.draw(bmdSourceA);

    if (effect === 4)
    {
        for (var i = 0; i < sequence.length; i++)
        {
            //  We need to copy the chunk even after finishing
            if (times[i].started)
            {
                if (sequence[i].alpha < 1)
                {
                    sequence[i].alpha += times[i].inc;
                }

                sequence[i].drawRect.width += 0.5;
                sequence[i].drawRect.height += 0.6;

                if (sequence[i].drawRect.height > tileHeight)
                {
                    sequence[i].drawRect.height = tileHeight;
                }

                if (sequence[i].drawRect.width > tileWidth)
                {
                    sequence[i].drawRect.width = tileWidth;
                }

                // bmdDest.copyPixels(bmdSourceB, sequence[i].rect, sequence[i].rect.x, sequence[i].rect.y, sequence[i].alpha);

                bmdDest.blit(bmdSourceB, sequence[i].rect, sequence[i].drawRect, 1);

                if (sequence[i].alpha >= 1)
                {
                    times[i].finished = true;
                }
            }
            else
            {
                if (game.time.now >= times[i].start)
                {
                    times[i].started = true;
                }
            }
        }

    }
    else
    {
        for (var i = 0; i < sequence.length; i++)
        {
            //  We need to copy the chunk even after finishing
            if (times[i].started)
            {
                if (sequence[i].alpha < 1)
                {
                    sequence[i].alpha += times[i].inc;
                }

                bmdDest.copyPixels(bmdSourceB, sequence[i].rect, sequence[i].rect.x, sequence[i].rect.y, sequence[i].alpha);

                if (sequence[i].alpha >= 1)
                {
                    times[i].finished = true;
                }
            }
            else
            {
                if (game.time.now >= times[i].start)
                {
                    times[i].started = true;
                }
            }
        }

    }


}

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

var direction = 0;

var i = 0;
var w = 0;
var h = 0;
var remaining = 0;

var sequence = [];
var times = [];
var running = false;
var data;

var s1 = "pic3";
var s2 = "pic4";
var r1;
var r2;

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

    // tileWidth = game.width;
    // tileHeight = game.height / 10;
    // tileHeight = 38;

    r1 = new Phaser.Rectangle(0, 0, tileWidth, tileHeight);
    r2 = new Phaser.Rectangle(0, 0, tileWidth, tileHeight);

    // data = game.make.tween({ h: 0 }).to( { h: tileHeight }, 1000, Phaser.Easing.Linear.None).generateData(60);
    // data = game.make.tween({ x: 0, y: 0, w: tileWidth, h: 0 }).to( { x: 0, y: 0, w: tileWidth, h: tileHeight }, 1000, Phaser.Easing.Linear.None).generateData(60);
    data = game.make.tween({ x: 0, y: tileHeight, w: tileWidth, h: 0 }).to( { x: 0, y: 0, w: tileWidth, h: tileHeight }, 1000, Phaser.Easing.Linear.None).generateData(60);
    // data = game.make.tween({ x: 0, y: tileHeight / 2, w: tileWidth, h: 0 }).to( { x: 0, y: 0, w: tileWidth, h: tileHeight }, 1000, Phaser.Easing.Linear.None).generateData(60);

    // var transform = { scaleX: 1, skewX: 0, skewY: 0, scaleY: 1, translateX: 0, translateY: 0 };

    var from = Phaser.BitmapData.getTransform(0, 0, 1, 0);
    var to = Phaser.BitmapData.getTransform(0, 0, 1, 1);

    // Phaser.BitmapData.getTransform = function (translateX 0, translateY 0, scaleX 1, scaleY 1, skewX 0, skewY 0) {

    // duration = game.rnd.between($('#durationMin').val(), $('#durationMax').val());
    // data = game.make.tween(from).to(to, 2000, Phaser.Easing.Linear.None).generateData(60);

    delay = 0;

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {
            // delay = game.rnd.between($('#delayMin').val(), $('#delayMax').val());
            times.push( { start: game.time.now + delay, i: 0, started: false, finished: false });
            delay += 50;
        }
    }

    console.log(game.width, 'x', game.height);
    console.log(tileWidth, 'x', tileHeight);
    // console.log('len', data.length);
    // console.log(data[0]);
    // console.log(data[data.length - 1]);

    // blit: function (image, source, dest, alpha, transform, blendMode) {

    // game.input.onDown.add(function() { console.log('start'); running = true; }, this);

    running = true;

}

function update() {

    if (running)
    {
        var entity = 0;

        for (var y = 0; y < h; y++)
        {
            for (var x = 0; x < w; x++)
            {
                var i = times[entity].i;

                r1.x = x * tileWidth;
                r1.y = y * tileHeight;

                r2.x = (x * tileWidth) + data[i].x;
                r2.y = (y * tileHeight) + data[i].y;
                r2.width = data[i].w;
                r2.height = data[i].h;

                bmdDest.blit(bmdSourceB, r1, r2, 1);

                if (!times[entity].started && game.time.now >= times[entity].start)
                {
                    times[entity].started = true;
                }

                if (times[entity].started && times[entity].finished === false)
                {
                    times[entity].i++;

                    if (times[entity].i === data.length - 1)
                    {
                        times[entity].finished = true;
                    }
                }

                entity++;

                // bmdDest.blit(bmdSourceB, r1, r2, 1, data[bob][i]);

                // var obj = { alpha: 1, }
                // sequence.push( { alpha: 0, rect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, tileWidth, tileHeight), drawRect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, 0, 0) } );
                // times.push( { start: 0, end: 0, duration: duration, inc: 0, incX: 0, incY: 0, incW: 0, incH: 0, delay: delay, started: false, finished: false });
            }
        }
    }

}


function take2() {

    // data = game.make.tween({ y: 0 }).to( { y: 300 }, 1000, Phaser.Easing.Sinusoidal.In).yoyo(true).generateData(60);


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

//  Top left corner expanding down
function setup4() {

    console.log('setup4');

    reset();

    // duration = 2000;
    // duration = game.rnd.between($('#durationMin').val(), $('#durationMax').val());
    // delay = game.rnd.between($('#delayMin').val(), $('#delayMax').val());

    var delay = 0;
    var duration = 2000;

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {
            sequence.push( { alpha: 0, rect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, tileWidth, tileHeight), drawRect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, 0, 0) } );
            times.push( { start: 0, end: 0, duration: duration, inc: 0, incX: 0, incY: 0, incW: 0, incH: 0, delay: delay, started: false, finished: false });
        }
    }

}

//  Top left corner expanding down
function setup5() {

    console.log('setup5');

    reset();

    // duration = 2000;
    // duration = game.rnd.between($('#durationMin').val(), $('#durationMax').val());
    // delay = game.rnd.between($('#delayMin').val(), $('#delayMax').val());

    var delay = 0;
    var duration = 2000;

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {
            // duration = game.rnd.between($('#durationMin').val(), $('#durationMax').val());
            delay = game.rnd.between($('#delayMin').val(), $('#delayMax').val());

            sequence.push( { alpha: 0, rect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, tileWidth, tileHeight), drawRect: new Phaser.Rectangle(x * tileWidth, y * tileHeight, tileWidth, 0) } );
            times.push( { start: 0, end: 0, duration: duration, i: 0, delay: delay, started: false, finished: false });
        }
    }

    var tweenData = { x: 0, y: 0, width: tileWidth, height: 0 };

    //  Here we'll tween the values held in the tweenData object to x: 500, y: 300
    var tween = game.make.tween(tweenData).to( { height: tileHeight }, 2000, Phaser.Easing.Sinusoidal.InOut);

    //  We have 3 interpolation methods available: linearInterpolation (the default), bezierInterpolation and catmullRomInterpolation.

    // tween.interpolation(game.math.bezierInterpolation);
    // tween.interpolation(game.math.catmullRomInterpolation);

    //  Generates the tween data at a rate of 60 frames per second.
    data = tween.generateData(60);

    console.log(data);

}

function start() {

    switch (effect)
    {
        case 4: setup4(); break;
        case 5: setup5(); break;
    }

    if (running)
    {
        return;
    }

    console.log('Draw start');

    /*
    for (var i = 0; i < times.length; i++)
    {
        //  times[i].duration is how long (in ms) this tile will take to transform once it has started

        sequence[i].alpha = 0;
        times[i].started = false;
        times[i].finished = false;
        times[i].start = game.time.now + times[i].delay;
        times[i].end = times[i].start + times[i].duration;

        var d = times[i].duration / 60; // number of times this will update based on the duration and a 60fps rate

        times[i].inc = 1 / d;
        times[i].incX = 0;
        times[i].incY = 0;
        times[i].incW = tileWidth / d;
        times[i].incH = tileHeight / d;
        console.log(d, times[i].inc, times[i].incX, times[i].incY, times[i].incW, times[i].incH);
    }
    */

    for (var i = 0; i < times.length; i++)
    {
        //  times[i].duration is how long (in ms) this tile will take to transform once it has started

        sequence[i].alpha = 0;
        times[i].started = false;
        times[i].finished = false;
        times[i].start = game.time.now + times[i].delay;
        times[i].end = times[i].start + times[i].duration;

        // var d = times[i].duration / 60; // number of times this will update based on the duration and a 60fps rate

        times[i].inc = 0;
        // times[i].incX = 0;
        // times[i].incY = tileHeight / d;
        // times[i].incW = 0;
        // times[i].incH = tileHeight / d;
        // console.log('d', d, 'i', times[i].inc, 'x', times[i].incX, 'y', times[i].incY, 'w', times[i].incW, 'h', times[i].incH);
    }

    running = true;

}

function OLDupdate() {

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

    for (var i = 0; i < sequence.length; i++)
    {
        //  We need to copy the chunk even after finishing
        if (times[i].started)
        {
            // if (sequence[i].alpha < 1)
            // {
            //     sequence[i].alpha += times[i].inc;
            // }

            //  effect 4
            // sequence[i].drawRect.x += times[i].incX;
            // sequence[i].drawRect.y += times[i].incY;
            // sequence[i].drawRect.width += times[i].incW;
            // sequence[i].drawRect.height += times[i].incH;

            //  effect 5
            // sequence[i].drawRect.x += times[i].incX;
            // sequence[i].drawRect.y -= times[i].incY;
            // sequence[i].drawRect.width += times[i].incW;
            sequence[i].drawRect.height = data[times[i].i];

            times[i].i++;

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

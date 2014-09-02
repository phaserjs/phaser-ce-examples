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

// var i = 0;
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

    // reset(4, 32);
    reset(16, 16);

    r1 = new Phaser.Rectangle(0, 0, tileWidth, tileHeight);
    r2 = new Phaser.Rectangle(0, 0, tileWidth, tileHeight);

    // data = game.make.tween({ h: 0 }).to( { h: tileHeight }, 1000, Phaser.Easing.Linear.None).generateData(60);
    // data = game.make.tween({ x: 0, y: 0, w: tileWidth, h: 0 }).to( { x: 0, y: 0, w: tileWidth, h: tileHeight }, 1000, Phaser.Easing.Linear.None).generateData(60);
    // data = game.make.tween({ x: 0, y: 0, w: tileWidth, h: 0 }).to( { x: 0, y: 0, w: tileWidth, h: tileHeight }, 1000, Phaser.Easing.Linear.None).generateData(60);
    // data = game.make.tween({ x: 0, y: tileHeight / 2, w: tileWidth, h: 0 }).to( { x: 0, y: 0, w: tileWidth, h: tileHeight }, 1000, Phaser.Easing.Linear.None).generateData(60);

    //  this + delay 5 = nice!
    // data = game.make.tween({ x: 0, y: 0, w: tileWidth, h: 0 }).to( { x: 0, y: 0, w: tileWidth, h: tileHeight }, 1000, Phaser.Easing.Linear.None).generateData(60);


    // var transform = { scaleX: 1, skewX: 0, skewY: 0, scaleY: 1, translateX: 0, translateY: 0 };

    var from = Phaser.BitmapData.getTransform(0, 0, 1, 0);
    var to = Phaser.BitmapData.getTransform(0, 0, 1, 1);

    // Phaser.BitmapData.getTransform = function (translateX 0, translateY 0, scaleX 1, scaleY 1, skewX 0, skewY 0) {

    // duration = game.rnd.between($('#durationMin').val(), $('#durationMax').val());
    // data = game.make.tween(from).to(to, 2000, Phaser.Easing.Linear.None).generateData(60);

    // data = game.make.tween({ x: tileWidth, y: tileHeight, w: 0, h: 0 }).to( { x: 0, y: 0, w: tileWidth, h: tileHeight }, 1000, Phaser.Easing.Linear.None).generateData(60);

    // reset(4, 32);
    // data = game.make.tween({ x: 0, y: 0, w: tileWidth, h: 0 }).to( { x: 0, y: 0, w: tileWidth, h: tileHeight }, 1000, Phaser.Easing.Linear.None).generateData(60);

    data = game.make.tween({ x: 0, y: 0, w: 0, h: 0 }).to( { x: 0, y: 0, w: tileWidth, h: tileHeight }, 1000, Phaser.Easing.Cubic.Out).generateData(60);

    delay = 0;

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {
            // delay = game.rnd.between(0, 2500);
            times.push( { start: game.time.now + delay, i: 0, started: false, finished: false, step: game.rnd.between(1, 6) });
            delay += 2;
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

                bmdDest.blit(bmdSourceB, r1, r2, 1, null);

                if (!times[entity].started && game.time.now >= times[entity].start)
                {
                    times[entity].started = true;
                }

                if (times[entity].started && times[entity].finished === false)
                {
                    times[entity].i += times[entity].step;

                    if (times[entity].i >= data.length - 1)
                    {
                        times[entity].finished = true;
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

    w = game.width / tileWidth;
    h = game.height / tileHeight;

}

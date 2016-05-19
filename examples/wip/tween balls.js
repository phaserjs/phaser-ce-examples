
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('ball', 'assets/sprites/pangball.png');

}

var balls;
var data;
var idx = 0;
var iy = [];
// var ox = 170;
// var oy = 80;
var p = { ox: 60, oy: 40 };
// var ox = 60;
// var oy = 40;
var spacing = 48;
var w = 10;
var h = 10;

function create() {

	// game.stage.backgroundColor = 0xff8855;
    

    balls = game.add.group();

    for (var y = 0; y < h; y++)
    {
        iy[y] = y * 3;

        for (var x = 0; x < w; x++)
        {
            var ball = balls.create(p.ox + (spacing * x), p.oy + (spacing * y), 'ball');
            ball.anchor.set(0.5);
        }
    }

    var tweenData = { x: -20, y: -30, sx: 1.4 };
    tween = game.make.tween(tweenData).to( { x: 20, y: 30, sx: 0.8 }, 500, Phaser.Easing.Sinusoidal.InOut);
    tween.yoyo(true);
    // tween.interpolation(game.math.bezierInterpolation);
    tween.interpolation(game.math.catmullRomInterpolation);
    data = tween.generateData(60);

    game.add.tween(p).to( { ox: 400 }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);
    // game.add.tween(p).to( { oy: 160 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);

}

function update() {

    var i = 0;

    for (var y = 0; y < h; y++)
    {
        for (var x = 0; x < w; x++)
        {
            var ball = balls.getAt(i);

            var bi = iy[y] + idx;
            bi = Phaser.Math.wrap(bi, 0, data.length);

            // ball.x = p.ox + (spacing * x) + data[bi].x;
            ball.x = p.ox + (spacing * x);
            ball.y = p.oy + (spacing * y) + data[bi].y;

            ball.scale.set(data[bi].sx);

            i++;
        }
    }


    idx++;

    if (idx === data.length)
    {
        idx = 0;
    }

}

function render() {

}
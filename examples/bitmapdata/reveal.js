
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pic1', 'assets/pics/cougar-face_of_nature.png');
    game.load.image('pic2', 'assets/pics/cougar_sanity_train.png');
    game.load.image('pic3', 'assets/pics/questar.png');
    game.load.image('pic4', 'assets/pics/slayer-sorry_im_the_beast.png');

}

var bmd;
var p = 1;
var pixels = [];
var temp = [];

function create() {

    game.stage.smoothed = false;

    bmd = game.make.bitmapData(320, 256);

    bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 2, 2);

    for (var y = 0; y < 256; y++)
    {
        for (var x = 0; x < 320; x++)
        {
            pixels.push([x,y]);
        }
    }

    temp = pixels.slice(0);

    Phaser.ArrayUtils.shuffle(temp);

}

function update () {

    for (var i = 0; i < 128; i++)
    {
        if (temp.length > 0)
        {
            var xy = temp.pop();
            bmd.copy('pic' + p, xy[0], xy[1], 1, 1);
        }
        else
        {
            temp = pixels.slice(0);

            Phaser.ArrayUtils.shuffle(temp);

            p++;

            if (p === 5)
            {
                p = 1;
            }
        }
    }

}


var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

var i;
var r;
var bmd;
var bmdDest;
var colors;
var floor;

function preload() {

    game.load.image('bob', 'assets/demoscene/ball-tlb.png');
    game.load.image('floor', 'assets/demoscene/checker-floor.png');

}

function create() {

    game.stage.backgroundColor = '#000042';

    floor = game.add.image(0, game.height, 'floor');
    floor.width = 800;
    floor.anchor.y = 1;

    bmd = game.make.bitmapData(game.width, game.height);

    bmdDest = game.make.bitmapData(game.width, game.height);
    bmdDest.addToWorld();

    game.input.addMoveCallback(paint, this);

    i = 0;
    r = new Phaser.Rectangle(0, 0, game.width, game.height);

    //  r = the rotation, s = the scale
    // data = { r: 0, s: 0.5 };

    //  Change the tween duration, ease type, values, etc for different effects
    // game.add.tween(data).to( { r: 360, s: 2 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);

}

function paint(pointer, x, y) {

    if (pointer.isDown)
    {
        bmd.draw('bob', x, y);
    }

}

function update() {

    bmd.fill(0, 0, 0, 0.05);

    // bmdDest.draw(floor);

   bmdDest.copy(bmd, 0, 0);

}

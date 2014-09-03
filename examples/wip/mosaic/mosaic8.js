var game = new Phaser.Game(1022, 466, Phaser.CANVAS, 'fx', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('pic3', 'pic1.jpg');
    game.load.image('pic4', 'pic2.jpg');

}

var bmdSourceA;
var bmdSourceB;
var bmdDest;

var s1 = "pic3";
var s2 = "pic4";
var r1;
var data;

function create() {

    //  Source images
    bmdSourceA = game.make.bitmapData(game.width, game.height);
    bmdSourceA.draw(s1);

    bmdSourceB = game.make.bitmapData(game.width, game.height);
    bmdSourceB.draw(s2);

    //  This one is displayed on-screen
    bmdDest = game.make.bitmapData(game.width, game.height);

    game.add.image(0, 0, bmdDest);

    //  fastCopy tests
    r1 = new Phaser.Rectangle(0, 0, 256, 256);

    data = { x: 128, y: 0, r: 0, s: 1 };

    game.add.tween(data).to( { x: game.width - 128, s: 2, r: 360 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, 1000, true);

}

function update() {

    bmdDest.cls();
    // bmdDest.draw(bmdSourceA);

    bmdDest.fastCopy(bmdSourceA, r1, data.x, 128, data.r);

    // bmdDest.fastCopy(bmd, r, game.world.centerX, game.world.centerY, data.r, 0.5, 0.5, data.s, data.s, 0.7);


}

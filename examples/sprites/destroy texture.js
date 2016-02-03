
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('plane', 'assets/misc/boss1.png');

}

var sprite1;
var sprite2;
var sprite3;

function create() {

    var bmd = game.add.bitmapData(256, 256);
    bmd.fill(0, 0, 255, 0.5);

    sprite1 = game.add.sprite(0, 0, bmd);
    sprite2 = game.add.sprite(200, 0, 'plane');

    game.input.onDown.addOnce(destroySprite, this);

}

function destroySprite () {

    sprite1.destroy(true, true);

    //  Create a new sprite, this should use a BMD from the pool

    var bmd = game.add.bitmapData(256, 256);

    bmd.fill(255, 0, 255, 0.5);

    sprite3 = game.add.sprite(0, 0, bmd);

}

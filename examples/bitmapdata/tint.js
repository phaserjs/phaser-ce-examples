
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('crystal', 'assets/pics/cougar_dragonsun.png');

}

var bmd;

function create() {

    game.world.setBounds(-200000, -200000, 400000, 400000);

    // game.world.x = -4343;
    // game.world.y = -12323;

    console.log(game.world.bounds);
    console.log(game.world.x);
    console.log(game.world.y);

    // bmd = game.make.bitmapData(game.width, game.height);

    // bmd.draw('crystal');

    // PIXI.CanvasTinter.tintMethod(bmd.texture, 0x3434ff, bmd.canvas);

    // var sprite = bmd.addToWorld();

    // sprite.tint = 0x2222ee;

}


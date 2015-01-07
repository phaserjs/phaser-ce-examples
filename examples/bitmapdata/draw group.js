
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('bg', 'assets/pics/undersea.jpg');
    game.load.image('loop', 'assets/sprites/beball1.png');

}

function create() {

    game.add.sprite(0, 0, 'bg');

    var group = game.make.group();

    //  Add a bunch of sprites in random positions to the group
    for (var i = 0; i < 40; i++)
    {
        group.create(game.world.randomX, game.world.randomY, 'loop');
    }

    //  This is the BitmapData we're going to be drawing to
    var bmd = game.add.bitmapData(game.width, game.height);

    bmd.addToWorld();

    //  Draw the group
    bmd.drawGroup(group);

}


var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('bg', 'assets/pics/undersea.jpg');
    game.load.image('loop', 'assets/sprites/beball1.png');
    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');

}

function create() {

    var group = game.make.group();

    group.create(0, 0, 'bg');

    //  Add a bunch of sprites in random positions to the group
    for (var i = 0; i < 16; i++)
    {
        group.create(game.world.randomX, game.world.randomY, 'loop');
    }

    var bmpText = game.make.bitmapText(32, 64, 'desyrel', 'Bitmap Text in the Group', 64);
    group.add(bmpText);

    //  This is the BitmapData we're going to be drawing to
    var bmd = game.add.bitmapData(game.width, game.height);

    var bmdContainer = bmd.addToWorld(390, 290, 0, 0, 0.5, 0.5);

    game.stage.updateTransform();

    //  Draw the whole game world (including the BitmapData!) to the BitmapData
    bmd.drawFull(game.world);

}

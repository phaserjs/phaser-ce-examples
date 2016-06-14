
// var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('bg', 'assets/pics/undersea.jpg');
    game.load.image('disk', 'assets/sprites/copy-that-floppy.png');
    game.load.image('squad', 'assets/sprites/bsquadron3.png');
    game.load.image('loop', 'assets/sprites/beball1.png');
    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');
    game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    game.load.atlasJSONHash('bot', 'assets/sprites/running_bot.png', 'assets/sprites/running_bot.json');

}

function create() {

    var group = game.make.group();

    group.create(0, 0, 'bg');

    //  Add a bunch of sprites in random positions to the group
    for (var i = 0; i < 16; i++)
    {
        var sprite = group.create(game.world.randomX, game.world.randomY, 'loop');

        if (i % 2 === 1)
        {
            sprite.tint = 0xff00ff;
        }
    }

    var bmpText = game.make.bitmapText(32, 64, 'desyrel', 'Bitmap Text in the Group', 64);
    bmpText.angle = 10;
    group.add(bmpText);

    //  A sprite with nested children
    var s = group.create(250, 300, 'disk');
    var r = game.make.sprite(32, 16, 'squad');
    s.addChild(r);

    r.angle = 45;
    s.scale.x = -1;
    s.angle = -20;

    var mummy = group.create(600, 4, 'mummy', 8);
    mummy.scale.set(4);
    mummy.smoothed = false;

    var bot = group.create(60, 200, 'bot');
    bot.scale.set(2);

    //  This is the BitmapData we're going to be drawing to
    var bmd = game.add.bitmapData(game.width, game.height);

    var bmdContainer = bmd.addToWorld(390, 290, 0, 0, 0.5, 0.5);

    game.stage.updateTransform();

    //  Draw the group to the BitmapData
    // bmd.drawGroup(group);
    bmd.drawGroup(game.world);

}

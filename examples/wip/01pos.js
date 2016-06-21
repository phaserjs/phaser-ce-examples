
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('bg', 'assets/pics/undersea.jpg');
    game.load.image('disk', 'assets/sprites/copy-that-floppy.png');
    game.load.image('squad', 'assets/sprites/bsquadron3.png');
    game.load.image('loop', 'assets/sprites/beball1.png');
    game.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');

}

var sprite;
var child1;

function create() {

    sprite = game.add.sprite(300, 200, 'disk');

    // sprite.scale.x = -1;

    child1 = game.make.sprite(64, 64, 'disk');

    sprite.addChild(child1);

    child1.scale.x = -1;

    game.stage.updateTransform();

    console.log(sprite.worldPosition, child1.worldPosition);

    /*
    var group = game.make.group();

    group.create(0, 0, 'bg');

    //  Add a bunch of sprites in random positions to the group
    for (var i = 0; i < 16; i++)
    {
        group.create(game.world.randomX, game.world.randomY, 'loop');
    }

    var bmpText = game.make.bitmapText(32, 64, 'desyrel', 'Bitmap Text in the Group', 64);
    bmpText.angle = 10;
    group.add(bmpText);

    //  A sprite with nested children
    var s = group.create(150, 300, 'disk');
    var r = game.make.sprite(32, 16, 'squad');
    s.addChild(r);

    r.angle = 45;
    s.scale.x = -1;

    //  This is the BitmapData we're going to be drawing to
    var bmd = game.add.bitmapData(game.width, game.height);

    var bmdContainer = bmd.addToWorld(390, 290, 0, 0, 0.5, 0.5);

    game.stage.updateTransform();

    //  Draw the group to the BitmapData
    bmd.drawGroup(group);
    // bmd.drawFull(group);
    */

    game.input.onDown.add(function() { console.log(child1.worldTransform); });

}

function render() {

    game.debug.geom(sprite.worldPosition, '#ff00ff');
    game.debug.geom(child1.worldPosition, '#ff0000');

    game.debug.text(sprite.worldScale.toString(), 32, 32);
    game.debug.text(child1.worldScale.toString(), 32, 64);

    game.debug.text(sprite.scale.toString(), 320, 32);
    game.debug.text(child1.scale.toString(), 320, 64);

}

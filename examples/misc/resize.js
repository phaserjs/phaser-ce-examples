
var game = new Phaser.Game('100%', '100%', Phaser.CANVAS, 'phaser-example', { init: init, preload: preload, create: create, update: update, resize: resize, render: render });

var bg;
var button1;
var button2;
var pad;
var mockgame;

var layer;
var alignedImages = [];

function init ()
{
    game.scale.scaleMode = Phaser.ScaleManager.RESIZE;
    // game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    // game.scale.compatibility.forceMinimumDocumentHeight = true;

    //  The 'fixed' game size
    game.scale.grid.setSize(640, 400);

    //  For mobile only
    // game.scale.forceOrientation(true, false);

    // window.a
}

function preload ()
{
    game.load.image('50', 'assets/sprites/50x50.png');
    game.load.image('hotdog', 'assets/sprites/hotdog.png');
    game.load.image('starfield', 'assets/skies/deep-space.jpg');
    game.load.image('mockgame', 'assets/pics/game14_angel_dawn.png');
    game.load.atlas('xbox360', 'assets/controllers/xbox360.png', 'assets/controllers/xbox360.json');
}

function create ()
{
    //  Added below the World
    bg = game.stage.addChildAt(game.make.tileSprite(0, 0, game.width, game.height, 'starfield'), 0);

    //  Added above the World
    button1 = game.add.image(0, 0, 'xbox360', '360_A');
    button2 = game.add.image(0, 0, 'xbox360', '360_B');
    pad = game.add.image(0, 0, 'xbox360', '360_Dpad');

    //  Our 'game'

    mockgame = game.add.sprite(0, 0, 'mockgame');
    // mockgame.anchor.set(0.5);

    alignPad();
}

function alignPad ()
{
    var w = Math.floor(game.scale.grid.boundsFull.width);
    var h = Math.floor(game.scale.grid.boundsFull.height);

    pad.x = 0 + 100;
    pad.y = h - 300;

    button1.x = w - 400;
    button1.y = h - 300;

    button2.x = w - 200;
    button2.y = h - 300;
}

function OLDcreate ()
{
    bg = game.add.tileSprite(0, 0, game.width, game.height, 'starfield');

    layer = game.scale.grid.createFluidLayer();

    var mockgame = layer.create(0, 0, 'mockgame');
    mockgame.align = 'top-left';

    var topLeft = layer.create(0, 0, '50');
    topLeft.align = 'top-left';

    var topRight = layer.create(0, 0, '50');
    topRight.anchor.set(1, 0);
    topRight.align = 'top-right';

    var bottomLeft = layer.create(0, 0, '50');
    bottomLeft.anchor.set(0, 1);
    bottomLeft.align = 'bottom-left';

    var bottomRight = layer.create(0, 0, '50');
    bottomRight.anchor.set(1, 1);
    bottomRight.align = 'bottom-right';

    alignedImages.push(mockgame);
    alignedImages.push(topLeft);
    alignedImages.push(topRight);
    alignedImages.push(bottomLeft);
    alignedImages.push(bottomRight);

    align();
}

function update ()
{
}

function resize (width, height)
{
    console.log(width, height);

    bg.width = width;
    bg.height = height;

    game.scale.grid.fitSprite(mockgame);

    alignPad();

    // align();

    if (game.scale.incorrectOrientation)
    {
        // game.scale.grid.fitSprite(orientationBG);
        // game.scale.scaleSprite(orientation, game.scale.width, game.scale.height, true);

        // orientation.x = game.scale.bounds.centerX;
        // orientation.y = game.scale.bounds.centerY;
    }
}

function align ()
{
    for (var i = 0; i < alignedImages.length; i++)
    {
        var sprite = alignedImages[i];

        if (sprite.align === 'top-left')
        {
            sprite.x = layer.topLeft.x;
            sprite.y = layer.topLeft.y;
        }
        else if (sprite.align === 'top-right')
        {
            sprite.x = layer.topRight.x;
            sprite.y = layer.topRight.y;
        }
        else if (sprite.align === 'bottom-right')
        {
            sprite.x = layer.bottomRight.x;
            sprite.y = layer.bottomRight.y;
        }
        else if (sprite.align === 'bottom-left')
        {
            sprite.x = layer.bottomLeft.x;
            sprite.y = layer.bottomLeft.y;
        }
    }
}

function render ()
{
    // game.debug.text(game.scale.grid.boundsFull.width + ' x ' + game.scale.grid.boundsFull.height, game.scale.grid.boundsFull.x + 4, game.scale.grid.boundsFull.y + 16);
    // game.debug.geom(game.scale.grid.boundsFull, 'rgba(255,0,0,0.9', false);

    // game.debug.text(game.scale.grid.boundsNone.width + ' x ' + game.scale.grid.boundsNone.height, game.scale.grid.boundsNone.x + 4, game.scale.grid.boundsNone.y + 16);
    // game.debug.geom(game.scale.grid.boundsNone, 'rgba(255,0,0,0.9', false);

    game.debug.text(game.scale.grid.boundsFluid.width + ' x ' + game.scale.grid.boundsFluid.height, game.scale.grid.boundsFluid.x + 4, game.scale.grid.boundsFluid.y + 16);
    game.debug.geom(game.scale.grid.boundsFluid, 'rgba(255,0,0,0.9', false);

    // game.debug.text(game.scale.grid.boundsCustom.width + ' x ' + game.scale.grid.boundsCustom.height, game.scale.grid.boundsCustom.x + 4, game.scale.grid.boundsCustom.y + 16);
    // game.debug.geom(game.scale.grid.boundsCustom, 'rgba(255,255,0,0.9', false);
}
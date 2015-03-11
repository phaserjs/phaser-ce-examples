/**
* @author       Chris Campbell <iforce2d@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Box2D Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/box2d
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('platform', 'assets/sprites/platform.png');
    game.load.image('phaser', 'assets/sprites/phaser_tiny.png');

}

_debugType = 
{
    NONE    : 0,
    SOME    : 1,
    WORLD   : 2,
    INFO    : 3
};

var caption;
var debugType = _debugType.INFO; // will roll over to NONE in create()
var spritesToDebug = [];
var topSprite; // after create(), will be the last created sprite
var triggerSprite = null; // sprite of rightmost body, removal which will cause collapse
var stepCount = 0;

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 200;

    //game.physics.box2d.debugDraw.aabbs = true;
    
    // Static platform for boxes to fall on
    var platformSprite = game.add.sprite(400, 550, 'platform');
    game.physics.box2d.enable(platformSprite);
    platformSprite.body.static = true;
    
    var spriteWidth = 9;
    var spriteHeight = 35;
    var spacingX = (2 * (spriteHeight - spriteWidth));
    var baseLayerCount = 10;
    var startX = 400 - (baseLayerCount / 2 - 0.5) * spacingX;
    var startY = 500;
    var count = 0;

    // Create tower of dominos.
    while (baseLayerCount > 0) {

        var layerType = count % 3;

        for (var x = 0; x < baseLayerCount; x++)
        {
            var xpos = startX + x * spacingX;
            topSprite = game.add.sprite(xpos, startY, 'phaser');
            game.physics.box2d.enable(topSprite);

            if (layerType == 0)
            {
                topSprite.body.angle = 90;
            }

            if (Math.random() < 0.25)
            {
                spritesToDebug.push( { sprite: topSprite, color: Phaser.Color.getRandomColor(0,255,255) } );
            }

            if (layerType > 1 && x > baseLayerCount - 3)
            {
                break;
            }
        }
        
        // end pieces
        if (layerType == 0 && count > 0)
        {
            topSprite = game.add.sprite(startX - spriteHeight - 0.5 * spriteWidth, startY + spriteWidth, 'phaser');
            game.physics.box2d.enable(topSprite);
            topSprite.body.angle = 90;

            topSprite = game.add.sprite(startX + (baseLayerCount-1) * spacingX + (spriteHeight + 0.5 * spriteWidth), startY + spriteWidth, 'phaser');
            game.physics.box2d.enable(topSprite);
            topSprite.body.angle = 90;

            if (!triggerSprite)
            {
                triggerSprite = topSprite;
            }
        }
        
        switch (layerType)
        {
            case 0: // upright
                startY -= 0.5 * (spriteWidth + spriteHeight);
                break;

            case 1:
                startX += spriteHeight - spriteWidth;
                startY -= spriteWidth;
                break;

            case 2:
                startY -= 0.5 * (spriteWidth + spriteHeight);
                baseLayerCount -= 1;
                break;
        }
        count += 1;

        if (count > 27)
        {
            break;
        }
    }
    
    caption = game.add.text(5, 5, '', { fill: '#ffffff', font: '14pt Arial' });
    changeDebugType();
    
    game.input.onDown.add(changeDebugType, this);

}

function changeDebugType() {

    debugType += 1;

    if (debugType > _debugType.INFO)
    {
        debugType = _debugType.NONE;
    }

    caption.text = 'Click to toggle debug display (currently: '+
        (debugType == _debugType.SOME ? 'some' :
        debugType == _debugType.WORLD ? 'world' :
        debugType == _debugType.INFO ? 'info' : 'none') +')';
}

function update() {

    stepCount += 1;

    if (stepCount == 180)
    {
        // three seconds
        triggerSprite.destroy();
    }

}

function render() {

    if (debugType == _debugType.SOME)
    {
        var i = spritesToDebug.length;

        while (i--)
        {
            game.debug.body(spritesToDebug[i].sprite, Phaser.Color.getWebRGB(spritesToDebug[i].color));
        }
    }
    else if (debugType == _debugType.WORLD)
    {
        game.debug.box2dWorld();
    }
    else if (debugType == _debugType.INFO)
    {
        game.debug.bodyInfo(topSprite, topSprite.x + 20, topSprite.y + 20);
        game.debug.body(topSprite, 'rgb(0,255,0)');
    }

}

/**
* @author       Chris Campbell <iforce2d@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Box2D Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/box2d
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

function preload() {

    game.load.image('phaser', 'assets/sprites/phaser.png');

}

var platformSprites = [];
var selectedSprite = null;

function create() {

    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    
    for (var i = 0; i < 4; i++)
    {
        var sprite = game.add.sprite(100 + i * 200, 300, 'phaser');
        game.physics.box2d.enable(sprite);
        sprite.body.kinematic = true;    
        sprite.body.angularVelocity = 0.2;
        platformSprites.push(sprite);
    }
    
    game.input.onDown.add(clickOnSomething, this);

    game.add.text(5,  5, 'Move the mouse to detect fixtures. Click to select.', { fill: '#ffffff', font: '14pt Arial' });
    game.add.text(5, 25, 'This method is used when you want to know if a point is inside a specific fixture.', { fill: '#ffffff', font: '14pt Arial' });
    game.add.text(5, 45, 'Please note this is not an efficient way to find out what is under the mouse.', { fill: '#ffffff', font: '14pt Arial' });
    game.add.text(5, 65, 'For an efficient method, see the "Get body at point" example.', { fill: '#ffffff', font: '14pt Arial' });
}

function clickOnSomething() {
    
    // Reset all to white
    if (selectedSprite)
    {
        selectedSprite.tint = 0xffffff;
    }
    
    // Check sprites one by one to see if any was clicked
    for (var i = 0; i < platformSprites.length; i++)
    {
        if (platformSprites[i].body.containsPoint(game.input.mousePointer))
        {
            selectedSprite = platformSprites[i];
            selectedSprite.tint = 0xff00ff;
        }
    }
    
}

function render() {
    
    for (var i = 0; i < platformSprites.length; i++)
    {
        // Draw fixture in yellow if mouse is currently over 
        if (platformSprites[i].body.containsPoint(game.input.mousePointer))
        {
            game.debug.body(platformSprites[i], 'rgb(255,255,0)');
        }
    }
    
}

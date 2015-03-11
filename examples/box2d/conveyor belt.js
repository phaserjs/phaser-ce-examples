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
    game.load.image('firstaid', 'assets/sprites/firstaid.png');

}

var littleBoxes = [];

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 500;
    game.physics.box2d.friction = 0.9;
    
    // Static platform 1
    var platformSprite1 = game.add.sprite(200, 300, 'platform');
    game.physics.box2d.enable(platformSprite1);
    platformSprite1.body.angle = -10;
    platformSprite1.body.static = true;
    
    // Static platform 2
    var platformSprite2 = game.add.sprite(600, 500, 'platform');
    game.physics.box2d.enable(platformSprite2);
    platformSprite2.body.angle = 10;
    platformSprite2.body.static = true;
    
    // Add some sprites to show how conveyor behaves
    for (var i = 0; i < 10; i++)
    {
        var sprite = game.add.sprite(Math.random() * 800, Math.random * -200, 'firstaid');
        game.physics.box2d.enable(sprite);
        littleBoxes.push(sprite);
        
        // Set up callback so we are informed when this sprite touches the platforms
        sprite.body.setBodyContactCallback(platformSprite1, contactCallback1, this);
        sprite.body.setBodyContactCallback(platformSprite2, contactCallback2, this);
    }
    
    game.add.text(5, 5, 'Conveyor belt behavior.', { fill: '#ffffff', font: '14pt Arial' });

}

// When a box begins touching the upper platform, we set the tangent speed to a negative value.
// This makes the contact behave as if the surfaces are moving clockwise.
function contactCallback1(body1, body2, fixture1, fixture2, begin, contact) {
    contact.SetTangentSpeed(-2);
}

// When a box begins touching the lower platform, we set the tangent speed to a positive value.
// This makes the contact behave as if the surfaces are moving counter-clockwise.
function contactCallback2(body1, body2, fixture1, fixture2, begin, contact) {
    contact.SetTangentSpeed(3);
}

function update() {
    
    // Drop little boxes from top again if they went off the screen
    for (var i = 0; i < littleBoxes.length; i++)
    {
        var box = littleBoxes[i];

        if (box.body.y > 630)
        {
            box.body.x = Math.random() * 800;
            box.body.y = Math.random() * -200;
            box.body.setZeroVelocity();
        }
    }

}

function render() {
    
    game.debug.box2dWorld();
    
}

/**
* @author       Chris Campbell <iforce2d@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Box2D Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/box2d
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('platform', 'assets/sprites/platform.png');
    game.load.image('block', 'assets/sprites/block.png');
    game.load.spritesheet('ship', 'assets/sprites/humstar.png', 32, 32);

}

var caption1;
var caption2;

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D); 
    game.physics.box2d.friction = 0.5;
    game.physics.box2d.setBoundsToWorld();
    game.physics.box2d.restitution = 0.7;
    game.physics.box2d.gravity.y = 500;

    // Dynamic circle
    ship = game.add.sprite(400, 100, 'ship');
    ship.scale.set(3);
    ship.smoothed = false;
    ship.animations.add('fly', [0,1,2,3,4,5], 10, true);
    ship.play('fly');
    game.physics.box2d.enable(ship, false);
    ship.body.setCircle(42);    
    
    // Set up handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);
    
    // A callback to match world boundary contacts
    ship.body.setCategoryPostsolveCallback(0x8000, callback, this);
    
    game.add.text(5, 5, 'Drag humstar with the mouse.', { fill: '#ffffff', font: '14pt Arial' });
    caption1 = game.add.text(5, 25, 'Last collision normal impulse: -', { fill: '#ffffff', font: '14pt Arial' });
    caption2 = game.add.text(5, 45, 'Last collision tangent impulse: -', { fill: '#ffffff', font: '14pt Arial' });

}

// This function will be called every timestep while the ship is contacting the world boundaries.
function callback(body1, body2, fixture1, fixture2, contact, impulseInfo) {
    
    // body1 is the ship because it's the body that owns the callback
    // body2 is the body it impacted with, in this case the world boundary
    // fixture1 is the fixture of body1 that was touched
    // fixture2 is the fixture of body2 that was touched
    // impulseInfo is a box2d.b2ContactImpulse object
    
    // The impulse info is split into a normal component (used to push the ship directly out of the wall)
    // and a tangential component (along the wall surface like friction, causes the ship to spin around)    
    if (impulseInfo.count > 0)
    {
        caption1.text = 'Last collision normal impulse:  ' + impulseInfo.normalImpulses[0];
        caption2.text = 'Last collision tangent impulse: ' + impulseInfo.tangentImpulses[0];
    }

}

function mouseDragStart() {
    
    game.physics.box2d.mouseDragStart(game.input.mousePointer);
    
}

function mouseDragMove() {
    
    game.physics.box2d.mouseDragMove(game.input.mousePointer);
    
}

function mouseDragEnd() {
    
    game.physics.box2d.mouseDragEnd();
    
}

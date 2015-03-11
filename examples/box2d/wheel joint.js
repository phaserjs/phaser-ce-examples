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

    game.load.image('a', 'assets/sprites/a.png');
    game.load.image('b', 'assets/sprites/b.png');

}

var codeCaption;
var bodyAs = [];

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.debugDraw.joints = true;
    game.physics.box2d.setBoundsToWorld();
    game.physics.box2d.gravity.y = 500;

    // Simple case with joint anchors at the center of each sprite, and
    // no motor or limits enabled, with default joint axis of (1,0)
    {
        // Static box
        var spriteA = game.add.sprite(200, 200, 'a');
        game.physics.box2d.enable(spriteA);
        spriteA.body.static = true;
        
        // Dynamic box
        var spriteB = game.add.sprite(200, 200, 'b');
        game.physics.box2d.enable(spriteB);
        
        // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
        game.physics.box2d.wheelJoint(spriteA, spriteB);
        
        bodyAs.push(spriteA.body);
    }

    // This case has the joint axis at an angle
    {
        // Static box
        var spriteA = game.add.sprite(600, 200, 'a');
        game.physics.box2d.enable(spriteA);
        spriteA.body.static = true;
        
        // Dynamic box
        var spriteB = game.add.sprite(600, 200, 'b');
        game.physics.box2d.enable(spriteB);
        
        // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
        game.physics.box2d.wheelJoint(spriteA, spriteB, 0,0,0,0, 0.5, 1);
        
        bodyAs.push(spriteA.body);
    }
    
    // This case uses an offset and 'suspension'.
    {
        // Static box
        var spriteA = game.add.sprite(200, 400, 'a');
        game.physics.box2d.enable(spriteA);
        spriteA.body.static = true;
        
        // Dynamic box
        var spriteB = game.add.sprite(200, 400, 'b');
        game.physics.box2d.enable(spriteB);
        
        // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
        game.physics.box2d.wheelJoint(spriteA, spriteB, 0,100,0,0, 0,1, 3, 0.5 );
        
        bodyAs.push(spriteA.body);
    }
    
    // This case uses an offset, suspension and a motor.
    {
        // Static box
        var spriteA = game.add.sprite(600, 400, 'a');
        game.physics.box2d.enable(spriteA);
        spriteA.body.static = true;
        
        // Dynamic box
        var spriteB = game.add.sprite(600, 400, 'b');
        game.physics.box2d.enable(spriteB);
        
        // bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled
        game.physics.box2d.wheelJoint(spriteA, spriteB, 0,100,0,0, 0,1, 3, 0.5, 360, 100, true );
        
        bodyAs.push(spriteA.body);
    }

    // Set up handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);
    
    game.add.text(5, 5, 'Wheel joint. Click to start.', { fill: '#ffffff', font: '14pt Arial' });
    game.add.text(5, 25, 'Mouse over bodyA to see the code used to create the joint.', { fill: '#ffffff', font: '14pt Arial' });
    codeCaption = game.add.text(5, 50, 'Parameters: bodyA, bodyB, ax, ay, bx, by, axisX, axisY, frequency, damping, motorSpeed, motorTorque, motorEnabled', { fill: '#dddddd', font: '10pt Arial' });
    codeCaption = game.add.text(5, 65, '', { fill: '#ccffcc', font: '14pt Arial' });
    
    // Start paused so user can see how the joints start out
    game.paused = true;
    game.input.onDown.add(function(){game.paused = false;}, this);
}

function mouseDragStart() { game.physics.box2d.mouseDragStart(game.input.mousePointer); }
function mouseDragMove() {  game.physics.box2d.mouseDragMove(game.input.mousePointer); }
function mouseDragEnd() {   game.physics.box2d.mouseDragEnd(); }

function update() {
    
    if (bodyAs[0].containsPoint(game.input.mousePointer))
    {
        codeCaption.text = 'game.physics.box2d.wheelJoint(spriteA, spriteB)';
    }
    else if (bodyAs[1].containsPoint(game.input.mousePointer))
    {
        codeCaption.text = 'game.physics.box2d.wheelJoint(spriteA, spriteB, 0,0,0,0, 0.5, 1)';
    }
    else if (bodyAs[2].containsPoint(game.input.mousePointer))
    {
        codeCaption.text = 'game.physics.box2d.wheelJoint(spriteA, spriteB, 0,100,0,0, 0,1, 3, 0.5 )';
    }
    else if (bodyAs[3].containsPoint(game.input.mousePointer))
    {
        codeCaption.text = 'game.physics.box2d.wheelJoint(spriteA, spriteB, 0,100,0,0, 0,1, 3, 0.5, 360, 100, true )';
    }
    else
    {
        codeCaption.text = '';
    }
    
}

function render() {
    
    // update will not be called while paused, but we want to change the caption on mouse-over
    if (game.paused)
    {
        update();
    }
    
    game.debug.box2dWorld();
    
}

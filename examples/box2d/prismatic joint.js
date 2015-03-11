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

    game.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', 32, 24);

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
        var spriteA = game.add.sprite(200, 200, 'diamonds', 1);
        game.physics.box2d.enable(spriteA);
        spriteA.body.static = true;
        
        // Dynamic box
        var spriteB = game.add.sprite(200, 200, 'diamonds', 2);
        game.physics.box2d.enable(spriteB);
        
        // bodyA, bodyB, axisX, axisY, ax, ay, bx, by, motorSpeed, motorForce, motorEnabled, lowerLimit, upperLimit, limitEnabled
        game.physics.box2d.prismaticJoint(spriteA, spriteB);
        
        bodyAs.push(spriteA.body);
    }

    // This case has the joint axis at an angle
    {
        // Static box
        var spriteA = game.add.sprite(400, 200, 'diamonds', 1);
        game.physics.box2d.enable(spriteA);
        spriteA.body.static = true;
        
        // Dynamic box
        var spriteB = game.add.sprite(400, 200, 'diamonds', 2);
        game.physics.box2d.enable(spriteB);
        
        // bodyA, bodyB, axisX, axisY, ax, ay, bx, by, motorSpeed, motorForce, motorEnabled, lowerLimit, upperLimit, limitEnabled
        game.physics.box2d.prismaticJoint(spriteA, spriteB, 0.5, 1);
        
        bodyAs.push(spriteA.body);
    }
    
    // This case has offset joint anchors
    {
        // Static box
        var spriteA = game.add.sprite(600, 200, 'diamonds', 1);
        game.physics.box2d.enable(spriteA);
        spriteA.body.static = true;
        
        // Dynamic box
        var spriteB = game.add.sprite(600, 200, 'diamonds', 2);
        game.physics.box2d.enable(spriteB);
        
        // bodyA, bodyB, axisX, axisY, ax, ay, bx, by, motorSpeed, motorForce, motorEnabled, lowerLimit, upperLimit, limitEnabled
        game.physics.box2d.prismaticJoint(spriteA, spriteB, 1, 0, 60, 40, -10, -20);
        
        bodyAs.push(spriteA.body);
    }
    
    // This case uses a joint motor.
    {
        // Static box
        var spriteA = game.add.sprite(200, 400, 'diamonds', 1);
        game.physics.box2d.enable(spriteA);
        spriteA.body.static = true;
        
        // Dynamic box
        var spriteB = game.add.sprite(200, 400, 'diamonds', 2);
        game.physics.box2d.enable(spriteB);
        
        // bodyA, bodyB, axisX, axisY, ax, ay, bx, by, motorSpeed, motorForce, motorEnabled, lowerLimit, upperLimit, limitEnabled
        game.physics.box2d.prismaticJoint(spriteA, spriteB, 1, 0, 0, 0, 0, 0, 90, 100, true);
        
        bodyAs.push(spriteA.body);
    }
    
    // This case uses joint limits.
    {
        // Static box
        var spriteA = game.add.sprite(600, 400, 'diamonds', 1);
        game.physics.box2d.enable(spriteA);
        spriteA.body.static = true;
        
        // Dynamic box
        var spriteB = game.add.sprite(600, 400, 'diamonds', 2);
        game.physics.box2d.enable(spriteB);
        
        // bodyA, bodyB, axisX, axisY, ax, ay, bx, by, motorSpeed, motorForce, motorEnabled, lowerLimit, upperLimit, limitEnabled
        game.physics.box2d.prismaticJoint(spriteA, spriteB, 1, 0, 0, 0, 0, 0, 0, 0, false, -50, 100, true);
        
        bodyAs.push(spriteA.body);
    }

    // Set up handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);
    
    game.add.text(5, 5, 'Prismatic joint. Click to start.', { fill: '#ffffff', font: '14pt Arial' });
    game.add.text(5, 25, 'Mouse over bodyA to see the code used to create the joint.', { fill: '#ffffff', font: '14pt Arial' });
    codeCaption = game.add.text(5, 50, 'Parameters: bodyA, bodyB, axisX, axisY, ax, ay, bx, by, motorSpeed, motorForce, motorEnabled, lowerLimit, upperLimit, limitEnabled', { fill: '#dddddd', font: '10pt Arial' });
    codeCaption = game.add.text(5, 65, '', { fill: '#ccffcc', font: '14pt Arial' });
    
    // Start paused so user can see how the joints start out
    game.paused = true;
    game.input.onDown.add(function(){game.paused = false;}, this);
}

function mouseDragStart() { game.physics.box2d.mouseDragStart(game.input.mousePointer); }
function mouseDragMove() {  game.physics.box2d.mouseDragMove(game.input.mousePointer); }
function mouseDragEnd() {   game.physics.box2d.mouseDragEnd(); }

function update() {
    
    if ( bodyAs[0].containsPoint(game.input.mousePointer) ) {
        codeCaption.text = 'game.physics.box2d.prismaticJoint(spriteA, spriteB)';
    }
    else if ( bodyAs[1].containsPoint(game.input.mousePointer) ) {
        codeCaption.text = 'game.physics.box2d.prismaticJoint(spriteA, spriteB, 0.5, 1)';
    }
    else if ( bodyAs[2].containsPoint(game.input.mousePointer) ) {
        codeCaption.text = 'game.physics.box2d.prismaticJoint(spriteA, spriteB, 1, 0, 60, 40, -10, -20)';
    }
    else if ( bodyAs[3].containsPoint(game.input.mousePointer) ) {
        codeCaption.text = 'game.physics.box2d.prismaticJoint(spriteA, spriteB, 1, 0, 0, 0, 0, 0, 90, 100, true)';
    }
    else if ( bodyAs[4].containsPoint(game.input.mousePointer) ) {
        codeCaption.text = 'game.physics.box2d.prismaticJoint(spriteA, spriteB, 1, 0, 0, 0, 0, 0, 0, 0, false, -50, 100, true)';
    }
    else {
        codeCaption.text = '';
    }
    
}

function render() {
    
    // update will not be called while paused, but we want to change the caption on mouse-over
    if ( game.paused ) {
        update();
    }
    
    game.debug.box2dWorld();
    
}
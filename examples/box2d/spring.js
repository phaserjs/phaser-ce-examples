/**
* @author       Chris Campbell <iforce2d@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Box2D Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/box2d
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render, update: update });

function preload() {
    game.load.image('block', 'assets/sprites/block.png');
}

var platform1;
var platform2;
var platform3;

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    
    game.physics.box2d.gravity.y = 500;
    game.physics.box2d.setBoundsToWorld();
    game.physics.box2d.restitution = 0.5;
    
    //Create a static ground body for our springs to attach to
    var ground = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 575, 0);
    ground.setRectangle(750, 50, 0, 0, 0);

    //create rectangular platform for the top of the spring
    platform1 = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX - 200, 475, 2);
    platform1.setRectangle(100, 20, 0, 0, 0);
    //create a prismatic joint to act as a spring. enable the motor and tweak the force and speed to get the desired springyness
    game.physics.box2d.prismaticJoint(ground, platform1, 0, -1, -200, 50, 0, 0, 1800, 500, true, 0, 150, true);
    
    //second spring platform
    platform2 = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 475, 2);
    platform2.setRectangle(100, 20, 0, 0, 0);
    //second spring, this one has more force than the first spring but lower speed
    game.physics.box2d.prismaticJoint(ground, platform2, 0, -1, 0, 50, 0, 0, 500, 300, true, 0, 150, true);
    
    //third platform
    platform3 = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX + 200, 475, 2);
    platform3.setRectangle(100, 20, 0, 0, 0);
    //third spring, this one is fast and very forceful
    game.physics.box2d.prismaticJoint(ground, platform3, 0, -1, 200, 50, 0, 0, 1200, 750, true, 0, 200, true);
    
    //dynamic square body to bounce around on the springs
    var box = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 50, 2);
    box.setRectangle(65, 65, 0, 0, 0);
    //circle body to play with on springs
    var circle = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX - 200, 2);
    circle.setCircle(30);
    //and a triangular polygon body to bounce on the springs
    var triangleBody = new Phaser.Physics.Box2D.Body(this.game, null, 0, 2);
    triangleBody.setPolygon([0,-70, -70,0, 70,0]);
    triangleBody.x = game.world.centerX + 200;
    triangleBody.y = 80;
    
    //set up mouse event handlers
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);
    
    
    game.add.text(5, 5, 'Mouse over a platform to see the code used to create the spring', { fill: '#ffffff', font: '14pt Arial' });
    codeCaption = game.add.text(5, 25, 'Parameters: bodyA, bodyB, axisX, axisY, ax, ay, bx, by, motorSpeed, motorForce, motorEnabled, lowerLimit, upperLimit, limitEnabled', { fill: '#dddddd', font: '10pt Arial' });
    codeCaption = game.add.text(5, 40, '', { fill: '#ccffcc', font: '12pt Arial' });
      
}

function update() {
    
    if (platform1.containsPoint(game.input.mousePointer))
    {
        codeCaption.text = 'game.physics.box2d.prismaticJoint(ground, platform1, 0, -1, -200, 50, 0, 0, 1800, 500, true, 0, 150, true);';
    }
    else if (platform2.containsPoint(game.input.mousePointer))
    {
        codeCaption.text = 'game.physics.box2d.prismaticJoint(ground, platform2, 0, -1, 0, 50, 0, 0, 500, 300, true, 0, 150, true);';
    }
    else if (platform3.containsPoint(game.input.mousePointer))
    {
        codeCaption.text = 'game.physics.box2d.prismaticJoint(ground, platform3, 0, -1, 200, 50, 0, 0, 1200, 750, true, 0, 200, true);';
    } 
    else
    {
        codeCaption.text = '';
    }
    
}

function mouseDragStart() { game.physics.box2d.mouseDragStart(game.input.mousePointer); }
function mouseDragMove() {  game.physics.box2d.mouseDragMove(game.input.mousePointer); }
function mouseDragEnd() {   game.physics.box2d.mouseDragEnd(); }

function render() {
    
    game.debug.box2dWorld();
    
}

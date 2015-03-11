/**
* @author       Chris Campbell <iforce2d@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Box2D Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/box2d
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, render: render });

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    
    game.physics.box2d.gravity.y = 500;

    game.physics.box2d.setBoundsToWorld();
    
    //  Create a static rectangle body for the ground. This gives us something solid to attach our crank to
    var ground = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 590, 0);
    ground.setRectangle(700, 20, 0, 0, 0);
    
    //  Tall skinny rectangle body for the crank
    var crank = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 450, 2);
    crank.setRectangle(15, 75, 0, 0, 0);
    //Revolute joint with motor enabled attaching the crank to the ground. This is where all the power for the slider crank comes from
    game.physics.box2d.revoluteJoint(ground, crank, 0, -160, 0, 30, 250, 50, true)
    
    //  Tall skinny rectangle body for the arm. Connects the crank to the piston
    var arm = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 360, 2);
    arm.setRectangle(15, 140, 0, 0, 0);
    //revolute joint to attach the crank to the arm
    game.physics.box2d.revoluteJoint(crank, arm, 0, -30, 0, 60);
    
    //  Square body for the piston. This will be pushed up and down by the crank
    var piston = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 300, 2);
    piston.setRectangle(40, 40, 0, 0, 0);
    //revolute joint to join the arm and the piston
    game.physics.box2d.revoluteJoint(arm, piston, 0, -60, 0, 0);
    //prismatic joint between the piston and the ground, this joints purpose is just to restrict the piston from moving on the x axis
    game.physics.box2d.prismaticJoint(ground, piston, 0, 1, 0, 0, 0, 0);
    
    //  Just a dynamic box body that falls on top of the piston to make the example more interesting
    var box = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 150, 2);
    box.setRectangle(40, 40, 0, 0, 0);
    
    // Set up handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);
    
}

function mouseDragStart() { game.physics.box2d.mouseDragStart(game.input.mousePointer); }
function mouseDragMove() {  game.physics.box2d.mouseDragMove(game.input.mousePointer); }
function mouseDragEnd() {   game.physics.box2d.mouseDragEnd(); }

function render() {
    
    game.debug.box2dWorld();
    
}

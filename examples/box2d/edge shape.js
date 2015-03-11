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

    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 400;
    game.physics.box2d.restitution = 0.8;
    game.physics.box2d.setBoundsToWorld();

    for (var i = 0; i < 10; i++)
    {
        var ball = new Phaser.Physics.Box2D.Body(this.game, null, game.world.randomX, 0);
        ball.setCircle(16);
        ball.bullet = true;
    }

    var ground = new Phaser.Physics.Box2D.Body(this.game, null, 0, 200);

    ground.addEdge(0, 0, 100, -100);
    ground.addEdge(100, -100, 200, -50);
    ground.addEdge(200, -50, 300, -50);
    ground.addEdge(300, -50, 500, -85);
    ground.addEdge(500, -85, 600, -10);
    ground.addEdge(600, -10, 700, -40);
    ground.addEdge(700, -40, 800, 0);

    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);

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

function render() {

    game.debug.box2dWorld();

}

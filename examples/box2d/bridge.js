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

    var PTM = 20; // conversion ratio

    var ground = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX, 500);

    var x1 = -20.0;
    var y1 = 2.0 * box2d.b2Cos(x1 / 10.0 * box2d.b2_pi);

    for (var i = 0; i < 80; ++i)
    {
        var x2 = x1 + 0.5;
        var y2 = 2.0 * box2d.b2Cos(x2 / 10.0 * box2d.b2_pi);

        ground.addEdge(x1 * PTM, y1 * PTM, x2 * PTM, y2 * PTM);

        x1 = x2;
        y1 = y2;
    }

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

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

    game.load.image('block', 'assets/sprites/block.png');

}

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.setBoundsToWorld();
    game.physics.box2d.gravity.y = 500;

    // Dynamic boxes
    for (var i = 0; i < 5; i++)
    {
        var blockSprite = game.add.sprite(150 + i * 125, 300 - i * 50, 'block');
        game.physics.box2d.enable(blockSprite);
        blockSprite.body.angle = 30;
    }
    
    // Set up handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);
    
    game.add.text(5, 5, 'Drag the objects with the mouse.', { fill: '#ffffff', font: '14pt Arial' });

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

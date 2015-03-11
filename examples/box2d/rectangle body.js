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
    game.load.image('block', 'assets/sprites/block.png');
}

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    
    game.physics.box2d.gravity.y = 500;
    game.physics.box2d.setBoundsToWorld();
    game.physics.box2d.restitution = 0.5;
    
    //Method 1: Create a rectangle body from an existing sprite automatically
    //Create a sprite and enable box2d physics. enabling Box2D physics on a sprite creates a matching rectangular Box2D body by default
    var block = game.add.sprite(400, game.world.centerY, 'block');
    game.physics.box2d.enable(block);
    
    //Method 2: Create a rectangle body manually, this will create a body that isn't attached to any sprite.
    //Create a Box2D body. Manually set the shape of the body to be a rectangle
    var rectangle = new Phaser.Physics.Box2D.Body(this.game, null, 345, game.world.centerY - 150, 0.5);
    rectangle.setRectangle(90, 50, 0, 0, 0);
    
}

function render() {
    
    game.debug.box2dWorld();
    
}

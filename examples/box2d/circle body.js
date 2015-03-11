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

    game.load.image('ball', 'assets/sprites/shinyball.png');

}

var circle

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    
    game.physics.box2d.gravity.y = 500;
    game.physics.box2d.restitution = 0.8;
    game.physics.box2d.setBoundsToWorld();
    
    //  Create a sprite with a Box2D physics body
    var ball = game.add.sprite(400, game.world.centerY, 'ball');
    game.physics.box2d.enable(ball);

    //  Set the Sprites body shape to a Circle with the same radius as the sprite (width / 2).
    ball.body.setCircle(ball.width / 2);
    
    //  You can also create a Circle body directly, without binding it to a sprite:
    var circle = game.physics.box2d.createCircle(300, 300, 32);
    
}

function render() {
    
    game.debug.box2dWorld();
    
}

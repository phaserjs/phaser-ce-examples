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
    
    //Create a rotated static rectangle for squares to slide on.
    var rectangle1 = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX - 80, 150, 0);
    rectangle1.setRectangle(600, 15, 0, 0, Math.PI / 12);
    rectangle1.static = true;
    
    //Another static rectangle to slide down after the first one
    var rectangle2 = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX + 80, 330, 0);
    rectangle2.setRectangle(600, 15, 0, 0, -Math.PI / 12);
    rectangle2.static = true;
    
    //One more rectangle platform to slide down
    var rectangle3 = new Phaser.Physics.Box2D.Body(this.game, null, game.world.centerX - 80, 510, 0);
    rectangle3.setRectangle(600, 15, 0, 0, Math.PI / 12);
    rectangle3.static = true;
    
    //static rectangle bodies that act as walls for the squares to bounce off of when they fall from platform to platform.
    var wall1 = new Phaser.Physics.Box2D.Body(this.game, null, 655, 230, 0);
    wall1.setRectangle(20, 50, 0, 0, 0);
    wall1.static = true;
    
    var wall2 = new Phaser.Physics.Box2D.Body(this.game, null, 145, 410, 0);
    wall2.setRectangle(20, 50, 0, 0, 0);
    wall2.static = true;
    
    //dynamic square bodies with varying levels of friction. These are created at the top and will slide down the rectangle platforms at varying speeds based on friction

    //Slowest square
    var square1 = new Phaser.Physics.Box2D.Body(this.game, null, 50, 30, 2);
    square1.setRectangle(20, 20, 0, 0, 0);
    square1.friction = 0.4;
    
    var square2 = new Phaser.Physics.Box2D.Body(this.game, null, 100, 30, 2);
    square2.setRectangle(20, 20, 0, 0, 0);
    square2.friction = 0.3;

    //Average square
    var square3 = new Phaser.Physics.Box2D.Body(this.game, null, 150, 30, 2);
    square3.setRectangle(20, 20, 0, 0, 0);
    square3.friction = 0.2;
    
    var square4 = new Phaser.Physics.Box2D.Body(this.game, null, 200, 30, 2);
    square4.setRectangle(20, 20, 0, 0, 0);
    square4.friction = 0.1;

    //Fastest square
    var square5 = new Phaser.Physics.Box2D.Body(this.game, null, 250, 30, 2);
    square5.setRectangle(20, 20, 0, 0, 0);
    square5.friction = 0;
    
}

function render() {
    
    game.debug.box2dWorld();
    
}

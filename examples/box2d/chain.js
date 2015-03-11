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

    game.load.spritesheet('chain', 'assets/sprites/chain.png', 16, 26);

}

function create() {

    game.stage.backgroundColor = '#124184';
    
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 500;

    createRope(20, 400, 100);  // (length, xAnchor, yAnchor)
    
    // Set up handlers for mouse events
    game.input.onDown.add(mouseDragStart, this);
    game.input.addMoveCallback(mouseDragMove, this);
    game.input.onUp.add(mouseDragEnd, this);
    
}

function createRope(length, xAnchor,yAnchor){

    var lastRect;  //if we created our first rect this will contain it
    var height = 20;  //height for the physics body - your image height is 8px
    var maxForce =20000;  //the force that holds the rectangles together

    for (var i = 0; i <= length; i++)
    {
        var x = xAnchor;
        var y = yAnchor + (i * height);
        
        // Switch sprite every second time
        if (i % 2 == 0)
        {
            newRect = game.add.sprite(x, y, 'chain',1);
        }
        else
        {
            newRect = game.add.sprite(x, y, 'chain',0);
            lastRect.bringToTop();
        }  

        game.physics.box2d.enable(newRect,false);

        if (i == 0)
        {
            newRect.body.static=true;
        }
        else
        {
            newRect.body.velocity.x = 100;
            newRect.body.mass = length/i; // make bodies toward the end of the chain lighter to improve stability
        }
        
        //  After the first rectangle is created we can add the constraint
        if (lastRect)
        {
            game.physics.box2d.revoluteJoint(lastRect, newRect, 0, 10, 0, -10);
        }
        
        lastRect = newRect;
    }

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

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
    game.load.image('firstaid', 'assets/sprites/firstaid.png');

}

var bodiesUnderMouse = [];

function create() {

    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    
    // Make a bunch of random bodies
    for (var x = 0; x < 100; x++)
    {
        var whichImage = Math.random() > 0.5 ? 'ball' : 'firstaid';
        var sprite = game.add.sprite(50 + Math.random() * 700, 100 + Math.random() * 450, whichImage);
        var scale = 1 + Math.random();
        sprite.scale.set(scale);
        game.physics.box2d.enable(sprite);

        if (whichImage == 'ball')
        {
            sprite.body.setCircle(16 * scale);
        }

        sprite.body.static = true;
        sprite.body.angle = Math.random() * 360;
    }

    // All the bodies in this example are static, so we only need to
    // update the bodiesUnderMouse array when the mouse actually moves.
    // If the bodies were moving around, you would probably want to update
    // the array regularly inside the update function, so that the array 
    // would be accurate even when the mouse does not move.
    game.input.addMoveCallback(mouseMove, this);
    
    game.add.text(5,  5, 'Move the mouse to detect fixtures.', { fill: '#ffffff', font: '14pt Arial' });
    game.add.text(5, 25, 'This method is efficient for large numbers of bodies.', { fill: '#ffffff', font: '14pt Arial' });
}

function mouseMove() {
    
    // If you want fixtures (box2d.b2Fixture) you can do this:
    //fixturesUnderMouse = game.physics.box2d.getFixturesAtPoint(game.input.mousePointer.x, game.input.mousePointer.y, true);
    
    // However, for this example we want to debug render the body so we'll do this:
    bodiesUnderMouse = game.physics.box2d.getBodiesAtPoint(game.input.mousePointer.x, game.input.mousePointer.y);
}

function render() {
    
    // Draw fixtures in green if mouse is currently over them
    for (var i = 0; i < bodiesUnderMouse.length; i++)
    {
        game.debug.body(bodiesUnderMouse[i].sprite, 'rgb(0,255,0)');
    }

}

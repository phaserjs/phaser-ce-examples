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

var bodies = [];
var codes = [];
var codeCaption;

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.debugDraw.centerOfMass = true;
        
    // Make some bodies (no fixtures to start with)
    for (var i = 0; i < 7; i++)
    {
        bodies.push( new Phaser.Physics.Box2D.Body(this.game, null, 100 + i * 100, 300, 0) );
    }
    
    // Add various fixtures
    bodies[0].setCircle(40);
    bodies[1].setRectangle(50, 100);
    bodies[2].setRectangle(50, 100, 0, 0, 10);
    bodies[3].setRectangle(50, 100, 0, 25, 10);     
    bodies[4].setEdge(-10, -20, 20, 60);    
    bodies[5].setChain([-10, -20, 20, 60, 35, -30, -20, -50, -40, 20, -10, 20]);    
    bodies[6].setPolygon([-10, -20, 20, 60, 35, -30, -20, -50, -40, 20, -10, 20]);
    
    // Make it easier for user to match code with result
    codes[0] = "setCircle(40)";
    codes[1] = "setRectangle(50, 100)";
    codes[2] = "setRectangle(50, 100, 0, 0, 10)";
    codes[3] = "setRectangle(50, 100, 0, 25, 10)";
    codes[4] = "setEdge(-10, -20, 20, 60)";
    codes[5] = "setChain( [-10, -20, 20, 60, 35, -30, -20, -50, -40, 20, -10, 20] )";
    codes[6] = "setPolygon( [-10, -20, 20, 60, 35, -30, -20, -50, -40, 20, -10, 20] )";
    
    game.add.text(5, 5, 'Manual fixture creation. Move the mouse near each type to see the code used to create it.', { fill: '#ffffff', font: '14pt Arial' });
    codeCaption = game.add.text(5, 25, '', { fill: '#ffffff', font: '14pt Arial' });

}

function render() {

    game.debug.box2dWorld();
    
    codeCaption.text = "";
    
    // Check if the mouse is near one of the bodies and if so, set the code text
    // We can't use Body.containsPoint because some of the fixtures are edge and
    // chain types which have no area.
    for (var i = 0; i < bodies.length; i++)
    {
        if (Math.abs(game.input.mousePointer.x - bodies[i].x ) < 50 && Math.abs(game.input.mousePointer.y - bodies[i].y ) < 50 )
        {
            codeCaption.text = codes[i];
            game.debug.box2dBody(bodies[i], 'rgb(255,255,0)');
        }
    }

}

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

var body;
var vertices = [];
var dynamicBodies = [];

function preload() {

    game.load.image('ball', 'assets/sprites/shinyball.png');
    game.load.image('firstaid', 'assets/sprites/firstaid.png');

}

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 400;
        
    // User will create polygon for this body
    body = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
    body.static = true;
    
    // Add some dynamic bodies to collide with the user-created shape
    for (var i = 0; i < 6; i++)
    {
        // offscreen to start with
        var sprite = game.add.sprite(1000, 200, i % 2 == 0 ? 'ball':'firstaid');
        game.physics.box2d.enable(sprite);

        if (i % 2 == 0)
        {
            sprite.body.setCircle(16);
        }       

        dynamicBodies.push( sprite.body );
    }

    game.input.onDown.add(addVertex, this);

    game.add.text(5,  5, 'Polygon decomposition. Click to add vertices.', { fill: '#ffffff', font: '14pt Arial' });

}

function addVertex(pointer) {
    
    body.clearFixtures();
    
    vertices.push( pointer.x );
    vertices.push( pointer.y );
    
    if (vertices.length >= 6)
    {
        body.setPolygon( vertices );
    
        // Drop dynamic bodies from top
        for (var i = 0; i < dynamicBodies.length; i++)
        {
            var b = dynamicBodies[i];
            b.x = Math.random() * 800;
            b.y = Math.random() * -200;
            b.setZeroVelocity();
        }
    }
}

function render() {

    game.debug.box2dWorld();
    
    for (var i = 0; i < vertices.length; i += 2)
    {
        game.debug.pixel( vertices[i]-3, vertices[i+1]-3, 'rgb(255,255,0)', 6 );
    }   

}

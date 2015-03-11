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

var _queryType = 
{
    AABB     : 0,
    CIRCLE   : 1,
    POLYGON  : 2
};

var caption;
var queryType = _queryType.POLYGON; // will roll over to AABB in create()
var circleBody, circleFixture;
var polygBody, polygonFixture;
var foundBodies = [];

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    
    // Make a body with a circle fixture
    circleBody = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
    circleFixture = circleBody.setCircle(50);
    
    // Make a body with a polygon fixture
    polygonBody = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
    polygonFixture = polygonBody.setPolygon([-150, -50, 100, -50, 200, 200]);
    
    // Make a bunch of random bodies
    for (var x = 0; x < 100; x++)
    {
        var whichImage = Math.random() > 0.5 ? 'ball' : 'firstaid';
        var sprite = game.add.sprite(50 + Math.random() * 700, 100 + Math.random() * 450, whichImage);
        game.physics.box2d.enable(sprite);

        if (whichImage === 'ball')
        {
            sprite.body.setCircle(16);
        }            

        sprite.body.static = true;
        sprite.body.angle = Math.random() * 360;
    }
    
    // All the bodies in this example are static, so we only need to
    // update the foundBodies array when the mouse actually moves.
    // If the bodies were moving around, you would probably want to update
    // the array regularly inside the update function, so that the array 
    // would be accurate even when the mouse does not move.
    game.input.addMoveCallback(mouseMove, this);
    
    game.add.text(5, 5, 'World query. Click to change query type.', { fill: '#ffffff', font: '14pt Arial' });
    caption = game.add.text(5, 25, '', { fill: '#ffffff', font: '14pt Arial' });
    
    game.input.onDown.add(changeQueryType, this);
    changeQueryType();
}

function changeQueryType() {
    
    queryType += 1;
    
    if (queryType > _queryType.POLYGON)
    {
        queryType = _queryType.AABB;
    }
    
    caption.text = 'Current query type: '+
        (queryType == _queryType.CIRCLE ? 'fixture overlap (circle)' :
        queryType == _queryType.POLYGON ? 'fixture overlap (polygon)' : 'AABB overlap');
        
    mouseMove();

}

function mouseMove() {

    var queryOutput;

    if (queryType == _queryType.CIRCLE )
    {
        queryOutput = game.physics.box2d.queryFixture( circleFixture );
    }
    else if (queryType == _queryType.POLYGON )
    {
        queryOutput = game.physics.box2d.queryFixture( polygonFixture );
    }
    else
    {
        queryOutput = game.physics.box2d.queryAABB( game.input.mousePointer.x - 100, game.input.mousePointer.y - 50, 200, 100 );
    }

    foundBodies = [];

    for (var i = 0; i < queryOutput.length; i++)
    {
        foundBodies.push(queryOutput[i].body);
    }
    
    circleBody.x = game.input.mousePointer.x;
    circleBody.y = game.input.mousePointer.y;
    polygonBody.x = game.input.mousePointer.x;
    polygonBody.y = game.input.mousePointer.y;

}

function line(x1, y1, x2, y2) {

    game.debug.context.beginPath();
    game.debug.context.moveTo(x1, y1);
    game.debug.context.lineTo(x2, y2);
    game.debug.context.stroke();

}

function render() { 
    
    // Draw fixtures in green if they match the query
    for (var i = 0; i < foundBodies.length; i++)
    {
        if (foundBodies[i].sprite)
        {
            game.debug.body(foundBodies[i].sprite, 'rgb(0,255,0)');
        }
    }

    game.debug.start();
    
    if (queryType == _queryType.CIRCLE)
    {
        Phaser.Physics.Box2D.renderBody(game.debug.context, circleBody);
    }
    else if (queryType == _queryType.POLYGON)
    {
        Phaser.Physics.Box2D.renderBody(game.debug.context, polygonBody);
    }
    else
    {
        var x = game.input.mousePointer.x, y = game.input.mousePointer.y;
        var w = 100, h = 50;

        line(x - w, y - h, x + w, y - h);
        line(x + w, y - h, x + w, y + h);
        line(x + w, y + h, x - w, y + h);
        line(x - w, y + h, x - w, y - h);
    }

    game.debug.stop();

}

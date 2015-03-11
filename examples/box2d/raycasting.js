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

    game.load.image('phaser', 'assets/sprites/phaser.png');
    game.load.image('contra2', 'assets/pics/contra2.png');

    // Load physics data exported from PhysicsEditor
    game.load.physics('physicsData', 'assets/physics/sprites.json');

}

_raycastType = 
{
    CLOSEST : 0,
    ALL     : 1,
    FILTERED: 2
};

var caption;
var raycastType = _raycastType.FILTERED; // will roll over to CLOSEST in create()
var staticBodies = [];

function create() {
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 500;
    
    // 'contra' sprites
    for (var i = 0; i < 3; i++)
    {
        var sprite = game.add.sprite(600, 100 + i * 200, 'contra2');
        game.physics.box2d.enable(sprite);
        sprite.body.static = true;
        sprite.body.rotation = 360 * Math.random();
    
        // Clear the shapes and load the 'contra2' polygon from the physicsData JSON file in the cache
        sprite.body.clearFixtures();
        sprite.body.loadPolygon('physicsData', 'contra2', sprite);
        
        staticBodies.push(sprite.body);
    }

    // Some kinematic bodies to illustrate filtering in callback
    for (var i = 0; i < 2; i++)
    {
        var sprite = game.add.sprite(400, 200 + i * 200, 'phaser');
        game.physics.box2d.enable(sprite);
        sprite.body.kinematic = true;
        sprite.body.rotateLeft(50);
    }
    
    game.add.text(5, 5, 'Raycasting. Use the mouse to move the destination of the ray. Click to change test type.', { fill: '#ffffff', font: '14pt Arial' });
    caption = game.add.text(5, 25, '', { fill: '#ffffff', font: '14pt Arial' });
    
    game.input.onDown.add(changeRaycastType, this);
    changeRaycastType();
}

function changeRaycastType() {
    
    raycastType += 1;
    
    if (raycastType > _raycastType.FILTERED)
    {
        raycastType = _raycastType.CLOSEST;
    }
    
    caption.text = 'Current test type: '+
        (raycastType == _raycastType.ALL ? 'all hits' :
        raycastType == _raycastType.FILTERED ? 'filtered to only top and bottom static bodies' : 'closest hit only');
}

/**
 * You can define a function like this to filter the hits you want
 *
 * @param {Phaser.Physics.Box2D.Body} body - the body the ray hit
 * @param {box2d.b2Fixture} fixture - the fixture the ray hit
 * @param {object} point - the location (pixels) the ray hit
 * @param {object} normal - the normal of the fixture surface at the location the ray hit
 * @return {boolean} return true if this hit should be used, false to ignore it
 */
function filterRaycastHit(body, fixture, point, normal) {

    if (body == staticBodies[0] || body == staticBodies[2])
    {
        return true;
    }
    
    return false;
}

function line(x1, y1, x2, y2) {

    game.debug.context.beginPath();
    game.debug.context.moveTo(x1, y1);
    game.debug.context.lineTo(x2, y2);
    game.debug.context.stroke();

}

function render() {

    game.debug.box2dWorld();
    
    game.debug.start();
    
    // Draw ray in faint white
    game.debug.context.strokeStyle = 'rgba(255,255,255,0.25)';  
    line(100, 300, game.input.mousePointer.x, game.input.mousePointer.y);
    
    // Cast a ray from a fixed point on the left side, to the mouse cursor position
    var closestOnly = (raycastType == _raycastType.CLOSEST);
    var filterFunction = (raycastType == _raycastType.FILTERED ? filterRaycastHit : null);
    var raycastOutput = game.physics.box2d.raycast( 100, 300, game.input.mousePointer.x, game.input.mousePointer.y, closestOnly, filterFunction );
    
    // Loop through and render all raycast intersection points
    game.debug.context.lineWidth = 2;

    for (var i = 0; i < raycastOutput.length; i++)
    {
        var hit = raycastOutput[i];

        // Draw unobstructed part of ray in solid white
        game.debug.context.strokeStyle = 'rgba(255,255,255,1)';
        line(100, 300, hit.point.x, hit.point.y);
    
        // Draw intersection normal in yellow
        game.debug.context.strokeStyle = 'rgba(255,255,0,1)';
        line(hit.point.x, hit.point.y, hit.point.x + 30 * hit.normal.x, hit.point.y + 30 * hit.normal.y);
    }

    game.debug.stop();
}

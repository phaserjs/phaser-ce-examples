/**
* @author       Chris Campbell <iforce2d@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Box2D Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/box2d
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { create: create, update: update, render: render });

var outlineVertices = [1440,-3186.59,1376.96,-3195.95,1023.88,-2194.34,1345.45,-1961.25,1345.45,-663.375,
    638.684,-480.341,160.054,-154.361,150.206,471.008,-318.575,470.023,-319.559,-153.376,
    -800.158,-480.341,-1519.35,-619.21,-1518.23,-1988.98,-1147.38,-2175.73,-1429.31,-3152.17,
    -1500.1,-3195.52,-1492.51,-3399.68,-1438.82,-3867.33,-1309.07,-4132.41,-1112.22,-4351.64,
    -787.851,-4540.67,-389.666,-4670.41,139.843,-4778.28,655.92,-4846.15,872.006,-4837.87,
    1067.14,-4792.27,1236.26,-4700.02,1374.63,-4584.71,1480.34,-4440.57,1557.21,-4271.45,
    1601.65,-3992.59,1601.41,-3712.19,1604.11,-2197.86,1814.72,-2234.37,1848.77,-2057.55,
    1600,-2003.04,1600,-171.408,1442.93,-169.434,1439.5,-663.941];

var launcherVertices = [1401.35,-224.963,1631.98,-224.963];
var guide1Vertices = [-825.819,-746.541,-771.419,-853.487,-1280,-1120,-1280,-1759.99,-1360,-1759.99,
    -1360,-959.993];
var guide2Vertices = [663.001,-743.13,614.862,-855.893,1119.91,-1121.82,1123.3,-1760.68,1200.08,-1759.99,
    1200.08,-959.993];
var guide3Vertices = [-1116.81,-1753.55,-1118.98,-1277.67,-878.975,-1117.67];
var guide4Vertices = [721.698,-1128.55,956.731,-1282.32,956.731,-1762.32];
var gutterVertices = [-480.857,413.599,293.837,413.599];

var bouncer1 = [-1042.47,-1763.21,-826.297,-1160.74];
var bouncer2 = [883.433,-1767.01,669.858,-1171.73];

var smallCircles = [1406,-3183.89,-1320,-1759.99,-1078.86,-1753.03,-861.88,-1152.05,918.723,-1760.8,1160.08,-1759.99,704.87,-1161.38];
var mediumCircles = [-1500.82,-3132.63,-866.447,-3163.29,-290.006,-3074.23,187.945,-3415.55,614.227,-3074.23,-451.581,-2232.34,396.293,-2242];
var largeCircles = [-446.686,-3704.69,309.841,-4133.62,995.658,-3595.05];

var leftFlipperVertices = [560,32,560,-32,0,-64,0,64];
var rightFlipperVertices = [0,64,0,-64,-560,-32,-560,32];

var ballStart = [17.5016, -21.318];


var ballBody;
var flipperJoints = [];
var PTM = 100; // conversion ratio for values in arrays above
var needReset = false;

function create() {
    
    game.world.setBounds(-400, -520, 800, 600);
    
    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.ptmRatio = 500;
    game.physics.box2d.gravity.y = 5000; // large gravity to make scene feel smaller
    game.physics.box2d.friction = 0.1;
    
    // Make the ground body
    var mainBody = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
    
    // Add bounce-less fixtures
    game.physics.box2d.restitution = 0.1;
    mainBody.addLoop(outlineVertices);
    mainBody.addLoop(guide1Vertices);
    mainBody.addLoop(guide2Vertices);
    mainBody.addChain(guide3Vertices);
    mainBody.addChain(guide4Vertices);
    
    // Add bouncy fixtures
    game.physics.box2d.restitution = 1;
    mainBody.addEdge(bouncer1[0], bouncer1[1], bouncer1[2], bouncer1[3]);
    mainBody.addEdge(bouncer2[0], bouncer2[1], bouncer2[2], bouncer2[3]);

    for (var i = 0; i < smallCircles.length / 2; i++)
    {
        mainBody.addCircle(0.35 * PTM, smallCircles[2 * i + 0], smallCircles[2 * i + 1]);
    }

    for (var i = 0; i < mediumCircles.length / 2; i++)
    {
        mainBody.addCircle(1 * PTM, mediumCircles[2 * i + 0], mediumCircles[2 * i + 1]);
    }

    for (var i = 0; i < largeCircles.length / 2; i++)
    {
        mainBody.addCircle(2.8 * PTM, largeCircles[2 * i + 0], largeCircles[2 * i + 1]);
    }
    
    // Add gutter fixture
    gutterFixture = mainBody.addEdge(gutterVertices[0], gutterVertices[1], gutterVertices[2], gutterVertices[3]);
    gutterFixture.SetSensor(true);
    
    // Set restitution for launcher
    game.physics.box2d.restitution = 2; 
    mainBody.addEdge(launcherVertices[0], launcherVertices[1], launcherVertices[2], launcherVertices[3]);
    
    // ball
    game.physics.box2d.restitution = 0.1;
    ballBody = new Phaser.Physics.Box2D.Body(this.game, null, ballStart[0] * PTM, ballStart[1] * PTM);
    ballBody.setCircle(0.64 * PTM);
    ballBody.setFixtureContactCallback(gutterFixture, onHitGutter, this);
    ballBody.bullet = true;

    // Flippers
    game.physics.box2d.restitution = 0.1;

    var leftFlipperBody = new Phaser.Physics.Box2D.Body(this.game, null, -8 * PTM, -7.99956 * PTM, 2);
    leftFlipperBody.addPolygon(leftFlipperVertices);

    var rightFlipperBody = new Phaser.Physics.Box2D.Body(this.game, null, 6.4 * PTM, -7.99956 * PTM, 2);
    rightFlipperBody.addPolygon(rightFlipperVertices);
    
    // Flipper joints
    var motorSpeed = 2;
    var motorTorque = 100;  
    // bodyA, bodyB, ax, ay, bx, by, motorSpeed, motorTorque, motorEnabled, lowerLimit, upperLimit, limitEnabled
    flipperJoints[0] = game.physics.box2d.revoluteJoint(mainBody,  leftFlipperBody,  -8*PTM,-7.99956*PTM, 0,0, motorSpeed, motorTorque, true, -25, 25, true );
    flipperJoints[1] = game.physics.box2d.revoluteJoint(mainBody, rightFlipperBody, 6.4*PTM,-7.99956*PTM, 0,0, motorSpeed, motorTorque, true, -25, 25, true );
    
    cursors = game.input.keyboard.createCursorKeys();
    
    var caption = game.add.text(5, 5, 'Pinball. Left/right arrow keys to control flippers.', { fill: '#ffffff', font: '14pt Arial' });
    caption.fixedToCamera = true;
}

function onHitGutter(body1, body2, fixture1, fixture2, begin) {
    needReset = true; // this occurs inside the world Step, so don't do the actual reset here
}

function update() {
    
    if (needReset)
    {
        ballBody.x = ballStart[0]*PTM;
        ballBody.y = ballStart[1]*PTM;
        ballBody.velocity.x = 0;
        ballBody.velocity.y = 0;
        ballBody.angularVelocity = 0;
        needReset = false;
    }
    
    var flipperSpeed = 20; // rad/s
    
    if (cursors.left.isDown)
    {
        flipperJoints[0].SetMotorSpeed(-flipperSpeed);
    }
    else
    {
        flipperJoints[0].SetMotorSpeed(flipperSpeed);
    }
    
    if (cursors.right.isDown)
    {
        flipperJoints[1].SetMotorSpeed(flipperSpeed);
    }
    else
    {
        flipperJoints[1].SetMotorSpeed(-flipperSpeed);
    }
    
}

function render() {

    game.debug.box2dWorld();

}

/**
* @author       Chris Campbell <iforce2d@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Box2D Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/box2d
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update:update, render: render });

function preload() {
    
    game.load.image('ball', 'assets/sprites/shinyball.png');
    
}

var balls = [];
var launchX = 400;
var launchY = 450;
var nextBall;

function create() {
    
    game.stage.backgroundColor = '#222222';
    
    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 500;
    
    game.input.onDown.add(fireBall, this);
    
    prepareNextBall();
    
    game.add.text(5, 5, 'Projected trajectory. Click to fire.', { fill: '#ffffff', font: '14pt Arial' });

}

function prepareNextBall() {
    
    var ball = game.add.sprite(launchX, launchY, 'ball');
    game.physics.box2d.enable(ball);
    ball.body.sensor = true;
    
    // Temporarily disable gravity to stop the ball from 
    // falling off the screen until it is launched
    ball.body.gravityScale = 0;
    
    nextBall = ball;
}

// Returns the velocity we will give to the ball on launch, for the
// current position of the mouse
function getLaunchVelocity() {
    
    var dx = game.input.mousePointer.x - launchX;
    var dy = game.input.mousePointer.y - launchY;
    
    // Give it some more beans
    dx *= 2;
    dy *= 2;
    
    return { x: dx, y: dy };    
}

// Returns the location the projectile will be at time step n after launch
function getTrajectoryPoint(startX, startY, velocityX, velocityY, n) {

    //velocity and gravity are given per second but we want time step values here
    var t = 1 / 60.0; // seconds per time step (at 60fps)
    
    var stepVelocityX = t * game.physics.box2d.pxm( -velocityX ); // m/s
    var stepVelocityY = t * game.physics.box2d.pxm( -velocityY );
    
    var stepGravityX = t * t * game.physics.box2d.pxm( -game.physics.box2d.gravity.x ); // m/s/s
    var stepGravityY = t * t * game.physics.box2d.pxm( -game.physics.box2d.gravity.y );

    startX = game.physics.box2d.pxm(-startX);
    startY = game.physics.box2d.pxm(-startY);
    
    var tpx = startX + n * stepVelocityX + 0.5 * (n*n+n) * stepGravityX;
    var tpy = startY + n * stepVelocityY + 0.5 * (n*n+n) * stepGravityY;
    
    tpx = game.physics.box2d.mpx(-tpx);
    tpy = game.physics.box2d.mpx(-tpy);
    
    return { x: tpx, y: tpy };

}

function fireBall() {
    
    var launchVelocity = getLaunchVelocity();
    
    // Set initial velocity and re-enable gravity
    nextBall.body.velocity.x = launchVelocity.x;
    nextBall.body.velocity.y = launchVelocity.y;
    nextBall.body.gravityScale = 1;
    
    balls.push(nextBall);
    
    prepareNextBall();
}

function update() {

    // Destroy any balls that go off screen
    for (var i = balls.length - 1; i >= 0; i--)
    {
        var bullet = balls[i];

        if (bullet.x < 0 || bullet.x > 800 || bullet.y > 600)
        {
            bullet.destroy();
            balls.splice(i,1);
        }
    }
}

function line(x1, y1, x2, y2) {
    game.debug.context.beginPath();
    game.debug.context.moveTo(x1, y1);
    game.debug.context.lineTo(x2, y2);
    game.debug.context.stroke();
}

function render() {

    var launchVelocity = getLaunchVelocity();

    game.debug.start();

    var lastPos = null;    

    for (var i = 0; i < 180; i += 6)
    {
        var trajectoryPoint = getTrajectoryPoint(launchX, launchY, launchVelocity.x, launchVelocity.y, i);

        if (lastPos && i % 12 == 0)
        {
            line(lastPos.x, lastPos.y, trajectoryPoint.x, trajectoryPoint.y);
        }

        lastPos = trajectoryPoint;
    }

    game.debug.stop();    
}

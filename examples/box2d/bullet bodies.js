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
    
    game.load.image('bullet', 'assets/sprites/enemy-bullet.png');
    
}

var caption;
var fireTimeout = 0;
var bullets = [];
var usingBullet = false;

function create() {
    
    game.stage.backgroundColor = '#222222';
    
    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.debugDraw.joints = true;
    game.physics.box2d.gravity.y = 500;
    game.physics.box2d.restitution = 0.025;
    
    // Ground body
    var groundBody = new Phaser.Physics.Box2D.Body(this.game, null, 0, 0, 0);
    
    // Body with long thin fixture
    var body = new Phaser.Physics.Box2D.Body(this.game, null, 600, 300, 100);
    body.setPolygon([-5, -250, -5, 250, 5, 250, 5, -250, ]);
    
    // Join long thin body to ground
    game.physics.box2d.revoluteJoint(groundBody, body, 600, 50, 0, -250);
    
    game.add.text(5, 5, 'Fast moving bodies will sometimes miss thin objects. Use bullet bodies to help avoid this.', { fill: '#ffffff', font: '14pt Arial' });
    caption = game.add.text(5, 25, '', { fill: '#ffffff', font: '14pt Arial' });
    
    updateCaption();
    
    game.input.onDown.add( toggleBullet, this );

}

function toggleBullet() {

    usingBullet = !usingBullet;
    updateCaption();

}

function updateCaption() {

    caption.text = 'Click to toggle bullet bodies. Currently: ' + (usingBullet ? 'bullet':'non-bullet');

}

function fireBullet() {
    
    // Create the bullet body and set the angle
    var bullet = game.add.sprite(50, 300, 'bullet');
    game.physics.box2d.enable(bullet);
    bullet.body.setCircle(5);
    
    // Set velocity
    bullet.body.velocity.x = 3000 + 1000 * Math.random();
    bullet.body.velocity.y = -500 + 1000 * Math.random();

    if (usingBullet)
    {
        bullet.body.bullet = true;
    }    
    
    // Add bullets to a list so we can remove them when they go offscreen
    bullets.push(bullet);
}

function update() {
    
    if (game.time.now > fireTimeout)
    {
        fireBullet();
        fireTimeout = game.time.now + 500;
    }

    // Destroy any bullets that go off screen
    for (var i = bullets.length - 1; i >= 0; i--)
    {
        var bullet = bullets[i];

        if (bullet.x < 0 || bullet.x > 800 || bullet.y < 0 || bullet.y > 600)
        {
            bullet.destroy();
            bullets.splice(i,1);
        }
    }
}

function render() {

    game.debug.box2dWorld();

}

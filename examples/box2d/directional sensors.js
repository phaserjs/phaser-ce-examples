/**
* @author       Chris Campbell <iforce2d@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Box2D Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/box2d
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('block', 'assets/sprites/block.png');
    game.load.spritesheet('ship', 'assets/sprites/humstar.png', 32, 32);

}

var ship;
var cursors;
var leftCaption, rightCaption, aboveCaption, belowCaption;
var leftContactCount = 0;
var rightContactCount = 0;
var aboveContactCount = 0;
var belowContactCount = 0;

function create() {

    game.stage.backgroundColor = '#124184';
    
    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    
    var blocks = game.add.physicsGroup(Phaser.Physics.BOX2D);

    // Create some sprites and set their body to be static
    blocks.create(180, 100, 'block').body.static = true;
    blocks.create(100, 200, 'block').body.static = true;
    blocks.create(200, 400, 'block').body.static = true;
    blocks.create(400, 300, 'block').body.static = true;
    blocks.create(500, 300, 'block').body.static = true;
    blocks.create(440, 100, 'block').body.static = true;
    blocks.create(500, 500, 'block').body.static = true;
    blocks.create(600, 200, 'block').body.static = true;

    // Create ship sprite with animation
    ship = game.add.sprite(200, 200, 'ship');
    ship.scale.set(2);
    ship.smoothed = false;
    ship.animations.add('fly', [0,1,2,3,4,5], 10, true);
    ship.play('fly');

    // Create our physics body - a 28px radius circle.
    game.physics.box2d.enable(ship);
    ship.body.fixedRotation = true;
    ship.body.setCircle(28);
    
    // Create some sensor fixtures
    var leftSensor =  ship.body.addCircle(10, -28, 0);
    var rightSensor = ship.body.addCircle(10, 28, 0);
    var aboveSensor = ship.body.addRectangle(20, 20, 0, -28);
    var belowSensor = ship.body.addRectangle(20, 20, 0, 28);

    leftSensor.SetSensor(true);
    rightSensor.SetSensor(true);
    aboveSensor.SetSensor(true);
    belowSensor.SetSensor(true);
    
    // Set up callbacks so we are informed when sensors touch something
    ship.body.setFixtureContactCallback(leftSensor,  leftCallback,  this);
    ship.body.setFixtureContactCallback(rightSensor, rightCallback, this);
    ship.body.setFixtureContactCallback(aboveSensor, aboveCallback, this);
    ship.body.setFixtureContactCallback(belowSensor, belowCallback, this);
    
    cursors = game.input.keyboard.createCursorKeys();
    
    game.add.text(5,  5, 'Sensor fixtures on each side detect which direction is being touched. Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });

    leftCaption = game.add.text(5,  25, '', { fill: '#ccffcc', font: '14pt Arial' });
    rightCaption = game.add.text(5,  45, '', { fill: '#ccffcc', font: '14pt Arial' });
    aboveCaption = game.add.text(5,  65, '', { fill: '#ccffcc', font: '14pt Arial' });
    belowCaption = game.add.text(5,  85, '', { fill: '#ccffcc', font: '14pt Arial' });
    
    updateCaptions();

}

function updateCaptions() {

    leftCaption.text =  "Left touching: " + (leftContactCount > 0 ? 'yes':'no');
    rightCaption.text = "Right touching: " + (rightContactCount > 0 ? 'yes':'no');
    aboveCaption.text = "Above touching: " + (aboveContactCount > 0 ? 'yes':'no');
    belowCaption.text = "Below touching: " + (belowContactCount > 0 ? 'yes':'no');

}

// body1 is the ship because it's the body that owns the callback
// body2 is the body it impacted with, in this case the enemy
// fixture1 is the fixture of body1 that was touched
// fixture2 is the fixture of body2 that was touched

function leftCallback(body1, body2, fixture1, fixture2, begin) {

    leftContactCount += (begin ? 1 : -1);
    updateCaptions();

}

function rightCallback(body1, body2, fixture1, fixture2, begin) {

    rightContactCount += (begin ? 1 : -1);
    updateCaptions();

}

function aboveCallback(body1, body2, fixture1, fixture2, begin) {

    aboveContactCount += (begin ? 1 : -1);
    updateCaptions();

}

function belowCallback(body1, body2, fixture1, fixture2, begin) {

    belowContactCount += (begin ? 1 : -1);
    updateCaptions();

}

function update() {

    ship.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
        ship.body.moveLeft(200);
    }
    else if (cursors.right.isDown)
    {
        ship.body.moveRight(200);
    }

    if (cursors.up.isDown)
    {
        ship.body.moveUp(200);
    }
    else if (cursors.down.isDown)
    {
        ship.body.moveDown(200);
    }
}

function render() {

    game.debug.box2dWorld();
    
}
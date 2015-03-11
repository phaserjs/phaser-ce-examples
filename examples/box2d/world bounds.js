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

    game.load.image('stars', 'assets/misc/starfield.jpg');
    game.load.image('ball', 'assets/sprites/shinyball.png');
    game.load.image('firstaid', 'assets/sprites/firstaid.png');
    game.load.spritesheet('ship', 'assets/sprites/humstar.png', 32, 32);

}

var ship;
var starfield;
var cursors;

function create() {
    
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.restitution = 0.9;
    game.physics.box2d.setBoundsToWorld();

    starfield = game.add.tileSprite(0, 0, 800, 600, 'stars');

    balls = game.add.group();
    balls.enableBody = true;
    balls.physicsBodyType = Phaser.Physics.BOX2D;

    for (var i = 0; i < 50; i++)
    {
        var sprite = balls.create(game.world.randomX, game.world.randomY, i % 2 == 0 ? 'ball' : 'firstaid');

        if (i % 2 == 0)
        {
            sprite.body.setCircle(16);
        }
        else
        {
            sprite.body.collideWorldBounds = false;
        }
    }

    ship = game.add.sprite(200, 200, 'ship');
    ship.scale.set(2);
    ship.smoothed = false;
    ship.animations.add('fly', [0,1,2,3,4,5], 10, true);
    ship.play('fly');

    // Create our physics body - a 28px radius circle.
    game.physics.box2d.enable(ship, false);
    ship.body.fixedRotation = true;
    ship.body.setCircle(28);

    cursors = game.input.keyboard.createCursorKeys();
    
    game.add.text(5,  5, 'Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });
    game.add.text(5, 25, 'Rectangle shapes are set to ignore world boundaries.', { fill: '#ffffff', font: '14pt Arial' });
    
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

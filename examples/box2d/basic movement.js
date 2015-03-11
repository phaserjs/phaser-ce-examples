/**
* @author       Chris Campbell <iforce2d@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Box2D Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/box2d
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('atari', 'assets/sprites/atari130xe.png');

}

var sprite;
var cursors;

function create() {

    game.stage.backgroundColor = '#124184';

    //  Enable Box2d physics
    game.physics.startSystem(Phaser.Physics.BOX2D);

    //  Add a sprite
    sprite = game.add.sprite(200, 200, 'atari');

    //  Enable for physics. This creates a default rectangular body.
    game.physics.box2d.enable(sprite);

    //  Modify a few body properties
    sprite.body.fixedRotation = true;

    game.add.text(5, 5, 'Use arrow keys to move.', { fill: '#ffffff', font: '14pt Arial' });

    cursors = game.input.keyboard.createCursorKeys();

}

function update() {

    sprite.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
        sprite.body.moveLeft(400);
    }
    else if (cursors.right.isDown)
    {
        sprite.body.moveRight(400);
    }

    if (cursors.up.isDown)
    {
        sprite.body.moveUp(400);
    }
    else if (cursors.down.isDown)
    {
        sprite.body.moveDown(400);
    }

}

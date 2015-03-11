/**
* @author       Chris Campbell <iforce2d@gmail.com>
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Phaser Box2D Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/box2d
*/

var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

function preload() {

    game.load.image('platform', 'assets/sprites/platform.png');
    game.load.image('ball', 'assets/sprites/shinyball.png');

}

function create() {

    game.stage.backgroundColor = '#124184';

    // Enable Box2D physics
    game.physics.startSystem(Phaser.Physics.BOX2D);
    game.physics.box2d.gravity.y = 500;

    // Static platform 
    var platformSprite = game.add.sprite(400, 550, 'platform');
    game.physics.box2d.enable(platformSprite);
    platformSprite.body.static = true;

    // Sprites for dynamic bodies
    var sprite1 = game.add.sprite(200, 100, 'ball');
    var sprite2 = game.add.sprite(400, 100, 'ball');
    var sprite3 = game.add.sprite(600, 100, 'ball');

    //  Enable physics. This creates a default rectangular body.
    game.physics.box2d.enable([ sprite1, sprite2, sprite3 ]);
    
    //  Adjust the gravity scale
    sprite1.body.restitution = 1;
    sprite2.body.restitution = 0.5;
    sprite3.body.restitution = 0.25;

    game.add.text(5, 5, 'Different restitution settings.', { fill: '#ffffff', font: '14pt Arial' });

}

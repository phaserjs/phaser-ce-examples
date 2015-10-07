/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Particle Storm Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/particlestorm
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

var manager = null;

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');
    game.load.image('white', 'assets/particlestorm/particles/white.png');

}

function create() {

    manager = game.plugins.add(Phaser.ParticleStorm);

    //  The HSV property allows you to set a color between 0 and 359
    //  which represents the degrees around a color wheel.
    //  
    //  When applied to a particle with a texture it can tint the image.

    var data = {
        lifespan: 6000,
        image: 'white',
        blendMode: 'ADD',
        hsv: { initial: 0, value: 359, control: 'linear' },
        vx: { min: -0.5, max: 0.5 },
        vy: { min: -1, max: -2 }
    };

    manager.addData('basic', data);

    emitter = manager.createEmitter(Phaser.ParticleStorm.SPRITE, new Phaser.Point(0, 0.01));

    emitter.addToWorld();

    emitter.emit('basic', 400, 300, { repeat: -1, frequency: 120 });

    game.add.image(432, 487, 'logo');

}

function update() {

}

function render() {

    emitter.debug(432, 522);

}

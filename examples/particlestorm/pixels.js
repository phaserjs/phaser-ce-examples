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

}

function create() {

    manager = game.plugins.add(Phaser.ParticleStorm);

    //  The HSV property allows you to set a color between 0 and 359
    //  which represents the degrees around a color wheel.
    //  
    //  Here we're using a control object. It will linearly change color
    //  between 0 and 359 (a complete loop of the color circle) over the
    //  lifespan of the particle.

    var data = {
        lifespan: 6000,
        hsv: { initial: 0, value: 359, control: 'linear' },
        vx: { min: -1, max: 1 },
        vy: { min: -1, max: -2 }
    };

    manager.addData('basic', data);

    emitter = manager.createEmitter(Phaser.ParticleStorm.PIXEL, new Phaser.Point(0, 0.01));

    emitter.renderer.pixelSize = 8;

    emitter.addToWorld();

    emitter.emit('basic', 400, 300, { repeat: -1, frequency: 60 });

    game.add.image(432, 487, 'logo');

}

function update() {

}

function render() {

    emitter.debug(432, 522);

}

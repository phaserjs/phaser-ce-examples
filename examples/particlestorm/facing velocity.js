/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Particle Storm Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/particlestorm
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, render: render });

var manager = null;
var emitter = null;

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.path = 'assets/particlestorm/sprites/';

    game.load.image('phaser');

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    //  Facing Velocity. The velocity of the particle is based on its rotation.
    //  Here we're a reverse control graph for the rotation
    //  and a yoyo graph for the facingVelocity.
    //  The scale completes the effect.

    var data = {
        lifespan: 5500,
        image: 'phaser',
        rotation: { initial: 0, value: 270, control: 'reverse' },
        facingVelocity: { offset: 90, value: 4, control: 'yoyo' },
        scale: { value: 2, control: [ { x: 0, y: 0 }, { x: 0.5, y: 1 }, { x: 1, y: 0 } ] }
    };

    manager.addData('basic', data);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    emitter.emit('basic', 500, 300, { repeat: -1, frequency: 500 });

    game.add.image(432, 487, 'logo');

}

function render() {

    emitter.debug(432, 522);

}

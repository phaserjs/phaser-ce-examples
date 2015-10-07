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

    game.load.path = 'assets/particlestorm/particles/';

    game.load.images(['ball1', 'block1', 'block2', 'block3', '4x4']);

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 4000,
        image: '4x4',
        velocity: { initial: 2, radial: { arcStart: -90, arcEnd: 90 }, control: [ { x: 0, y: 1 }, { x: 0.5, y: 0.5 }, { x: 1, y: 0 } ] }
    };

    manager.addData('basic', data);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    emitter.emit('basic', 400, 400, { repeat: -1, frequency: 10 });

    game.add.image(432, 487, 'logo');

}

function update() {

}

function render() {

    emitter.debug(432, 522);

}

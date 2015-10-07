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

    game.load.images(['block1', 'block2', 'block3', 'block4', 'block5', 'spark']);

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        ignoreForce: true,
        image: ['block1', 'block2', 'block3', 'block4', 'block5'],
        emit: { name: "child", at: [ { time: 1, value: 2 } ] }
    };

    var child = {
        lifespan: 4000,
        image: 'spark',
        vx: { min: -1, max: 1 },
        vy: { min: -3, max: -4 }
    };

    manager.addData('basic', data);
    manager.addData('child', child);

    emitter = manager.createEmitter();

    emitter.force.y = 0.05;

    emitter.addToWorld();

    //  Here there is a 2000ms delay before the first particle starts.
    //  Then 120ms for every particle after that.
    //  The xStep places the particles 32px apart horizontally, so the start
    //  in sequence.
    //  The repeat -1 means to repeat this emit forever.
    //  This demo will emit children as the particles 'die'.
    emitter.emit('basic', 100, 250, { total: 20, xStep: 32, delay: { start: 0, step: 60, visible: true }, repeat: -1, frequency: 4000 });

    game.add.image(432, 487, 'logo');

}

function render() {

    emitter.debug(432, 522);

}

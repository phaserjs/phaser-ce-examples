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
var emitter = null;
var line = null;

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.path = 'assets/particlestorm/particles/';

    game.load.image('pixel2x2_yellow');

}

function create() {

    manager = game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: { min: 3000, max: 5000 },
        image: 'pixel2x2_yellow'
    };

    manager.addData('basic', data);

    line = manager.createLineZone(100, 64, 700, 332);

    emitter = manager.createEmitter(Phaser.ParticleStorm.SPRITE_BATCH, new Phaser.Point(0, 0.01));

    emitter.addToWorld();

    emitter.emit('basic', 0, 0, { zone: line, total: 16, repeat: -1, frequency: 30 });

    game.add.image(432, 487, 'logo');

}

function update() {

    line.shape.rotate(0.01);

}

function render() {

    emitter.debug(432, 522);

}

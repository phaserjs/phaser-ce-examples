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

    game.load.image('4x4', 'assets/particlestorm/particles/rain.png');

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 3000,
        image: '4x4',
        vy: 1,
        alpha: { value: 1, delta: -0.007 }
    };

    manager.addData('basic', data);

    //  Creates an Ellipse zone with the given width and height values
    var ellipse = manager.createEllipseZone(400, 100);

    emitter = manager.createEmitter();

    emitter.force.y = 0.02;

    emitter.addToWorld();

    emitter.emit('basic', 400, 160, { zone: ellipse, total: 16, repeat: -1, frequency: 40 });

    game.add.image(432, 487, 'logo');

}

function update() {

}

function render() {

    emitter.debug(432, 522);

}

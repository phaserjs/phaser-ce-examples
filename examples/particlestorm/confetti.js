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
var circle = null;

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.path = 'assets/particlestorm/particles/';

    game.load.images(['pixel_blue', 'pixel_green', 'pixel_red', 'pixel_white', 'pixel_yellow']);

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 3000,
        image: ['pixel_blue', 'pixel_green', 'pixel_red', 'pixel_white', 'pixel_yellow'],
        vx: { min: -0.5, max: 0.5 },
        vy: { min: -1, max: -2 },
        rotation: { delta: 2 },
        blendMode: 'ADD',
        alpha: { initial: 0, value: 1, control: 'linear' }
    };

    manager.addData('basic', data);

    circle = manager.createCircleZone(24);

    emitter = manager.createEmitter();

    emitter.force.y = 0.05;

    emitter.addToWorld();

    game.add.image(432, 487, 'logo');

}

function update() {

    emitter.emit('basic', game.input.x, game.input.y, { zone: circle, total: 2 });

}

function render() {

    emitter.debug(432, 522);
    game.debug.text("Move Mouse", 32, 32);

}

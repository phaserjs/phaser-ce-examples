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

    game.load.image('starfield', 'assets/particlestorm/starfield.jpg');

    game.load.path = 'assets/particlestorm/particles/';

    game.load.images(['flare_point', 'bullet', 'block3', 'block4']);

}

function create() {

    game.add.image(0, 0, 'starfield');

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var bullet = {
        image: 'bullet',
        anchorX : 0.8,
        anchorY : 0.5,
        vy: -8.0,
        scale: 0.5,
        rotation: -90.0,
        emit: {
            name: 'flareSpin',
            value: 0.07
        }
    };

    var flareSpin = {
        image: 'flare_point',
        blendMode: 'ADD',
        lifespan: { min: 500, max: 1000 },
        scale: { min: 0.10, max: 0.30 },
        vx: { value:{ min: -0.50, max: 0.50 }, control: [ { x: 0, y: 0 }, { x: 0.5, y: 1 }, { x: 1, y:0 } ] },
        alpha: { value: 1, control : [ { x: 0, y: 0 }, { x: 0.2, y: 1 }, { x: 1, y: 0 } ] },
        rotation: { value: { min: -180, max: 180 }, delta: { min: -5, max: 5 } }
    };

    manager.addData('bullet', bullet);
    manager.addData('flareSpin', flareSpin);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    game.input.onDown.add(fire, this);

    game.add.image(432, 487, 'logo');

}

function fire(pointer) {

    emitter.emit('bullet', pointer.x, 600);

}

function render() {

    game.debug.text('Click to fire', 32, 32);

    emitter.debug(432, 522);

}

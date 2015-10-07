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
var smokeEmitter = null;
var flameEmitter = null;

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.image('white', 'assets/particlestorm/particles/white.png');
    game.load.image('smoke', 'assets/particlestorm/particles/smoke-puff.png');

}

function create() {

    manager = game.plugins.add(Phaser.ParticleStorm);

    //  A burning torch

    var flame = {
        lifespan: 3000,
        image: 'white',
        bringToTop: true,
        blendMode: 'ADD',
        hsv: { initial: 0, value: 70, control: 'linear' },
        alpha: { initial: 0, value: 1, control: [ { x: 0, y: 1 }, { x: 0.5, y: 0.8 }, { x: 1, y: 0 } ] },
        scale: { min: 0.5, max: 1.5 },
        vx: { min: -0.2, max: 0.2 },
        vy: { min: -1, max: -2 }
    };

    var spark = {
        lifespan: 3500,
        image: 'white',
        bringToTop: true,
        blendMode: 'ADD',
        alpha: { initial: 0, value: 1, control: [ { x: 0, y: 1 }, { x: 0.5, y: 0.9 }, { x: 1, y: 0 } ] },
        scale: { initial: 0, value: 1, control: 'linear' },
        vx: { min: -0.2, max: 0.2 },
        vy: { min: -1, max: -2 }
    };

    var smoke = {
        lifespan: 3000,
        image: 'smoke',
        sendToBack: true,
        alpha: { initial: 0, value: 1, control: [ { x: 0, y: 0 }, { x: 0.2, y: 1 }, { x: 0.5, y: 0.5 }, { x: 1, y: 0 } ] },
        scale: { min: 1, max: 1.5 },
        vx: { min: -0.2, max: 0.2 },
        vy: { min: -1, max: -2 }
    };

    manager.addData('flame', flame);
    manager.addData('spark', spark);
    manager.addData('smoke', smoke);

    smokeEmitter = manager.createEmitter();
    flameEmitter = manager.createEmitter();

    smokeEmitter.addToWorld();
    flameEmitter.addToWorld();

    smokeEmitter.emit('smoke', 400, 300, { delay: 3000, repeat: -1, frequency: 360 });

    flameEmitter.emit('spark', 400, 450, { repeat: -1, frequency: 140 });
    flameEmitter.emit('flame', 400, 450, { repeat: -1, frequency: 40 });

    game.add.image(432, 487, 'logo');

}

function update() {

}

function render() {

    smokeEmitter.debug(432, 522);
    flameEmitter.debug(10, 522);

}

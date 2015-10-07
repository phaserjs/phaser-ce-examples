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

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.image('sky', 'assets/particlestorm/sprites/haze.png');

    game.load.path = 'assets/particlestorm/particles/';

    game.load.images([ 'stone', 'muzzleflash3', 'smoke-puff' ]);

}

function create() {

    game.add.image(0, 0, 'sky');

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    //  This example illustrates:
    //  
    //  * delay range for when each particle will become visible
    //  * scale going to oversize range (1.4) as the 'alpha' fade it out
    //  * rotation with a random delta
    //  * emit uses "at" instead of "control" to create child sprites more precisely at given life-points
    //  * emit.at uses a fractional 'value' (< 1.0) for the first wave of shrapnel, to express a 
    //    percentage chance of creating a child then (0.4 = 40%)
    //  * It uses a value of 2 to create exactly two smoke particles at 0.5 through it's life
    //  * emit.child uses "at" instead of a JSON name string to create different child types at 
    //    different stages of it's life
    //  * velocity uses the 'radial' option to specify an arc for the initial vx and vy values, 
    //    but 'vy' is also defined separately to include a 'delta' value for gravity, 
    //    and 'vx' has a control to simulate air friction

    var explosion = {
        image: 'muzzleflash3',
        lifespan: { min: 400, max: 600 },
        delay: { min: 0, max: 200 },
        scale: { value: 1, control: [ { x: 0, y: 0.3 }, { x: 0.25, y: 0.75 }, { x: 0.8, y: 1 }, { x: 1, y: 1.4 } ] },
        alpha: { value: 1, control: [ { x: 0, y: 1 }, { x: 0.3, y: 1 }, { x: 0.6, y: 0.2 }, { x: 1, y: 0 } ] },
        vx: { value: { min: -2, max: 2 }, control: [ { x: 0, y: 1 }, { x: 1, y: 0 } ] },
        vy: { value: { min: -5, max: 0 }, control: [ { x: 0, y: 1 }, { x: 1, y: 0 } ] },
        rotation: { initial: 0, delta: { min: -3, max: 3 } },
        emit: {
            name: { at: [ { time: 0, value: 'shrapnel' }, { time: 0.5, value: 'smoke' } ] }, 
            value: 0, at: [ { time: 0, value: 0.4 }, { time: 0.5, value: 2 } ]
        }
    };

    var shrapnel = {
        image: 'stone',
        delay: { min: 0, max: 200 },
        lifespan: 1800,
        velocity: { initial: { min: 4, max: 8 }, radial: { arcStart: -45, arcEnd: 45 } },
        vx: { control: [ { x: 0, y: 1 }, { x: 1, y: 0.5 } ] },
        vy: { delta: 0.25 },
        scale: { min: 0.1, max: 0.3 },
        rotation: { initial: 0, delta: { min: -9, max: 9 } },
        alpha: { value: 1, control: [ { x: 0, y: 1 }, { x: 0.75, y: 1 }, { x: 1, y: 0 } ] },
        sendToBack: true
    };

    var smoke = {
        image: 'smoke-puff',
        lifespan: { min: 1700, max: 2000 },
        vx: 0,
        vy: { value: { min: -3, max: -2 }, delta: -0.05, control: [ { x: 0, y: 1 }, { x: 1, y: 0.5 } ] },
        scale: { value: { min: 0.4, max: 0.6 }, delta: 0.005, control: [ { x: 0, y: 1 }, { x: 0.6, y: 1 }, { x: 1, y: 0.25 } ] },
        alpha: { value: 0.3, control:[ { x: 0, y: 0 }, { x: 0.3, y: 1 }, { x: 1, y: 0 } ] },
        rotation: { value: 0, delta: { min: -2, max: 2 } },
        sendToBack: true
    };

    manager.addData('explosion', explosion);
    manager.addData('shrapnel', shrapnel);
    manager.addData('smoke', smoke);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    var circle = manager.createCircleZone(30);

    emitter.emit('explosion', [200, 600], [300, 500], { zone: circle, total: 25, repeat: -1, frequency: 1000 });

    game.add.image(432, 487, 'logo');

}

function update() {

}

function render() {

    emitter.debug(432, 522);

}

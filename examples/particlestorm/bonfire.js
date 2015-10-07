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

    game.load.images([ 'fire1', 'fire2', 'fire3', 'smoke-puff' ]);

}

function create() {

    game.add.image(0, 0, 'sky');

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    //  This example illustrates:
    //  
    //  * Creating particles within an area
    //  * Fire:
    //      Select image randomly from a list
    //      Variable lifespan range
    //      Variable initial vx
    //      vy that increases in magnitude constantly
    //      scaleX and scaleY controlled by 'scale', shrink from initial value of 0.5 to final value of 50% (0.25)
    //      alpha fade in, hold, then fade out again
    //      Create child smoke particles during last 20% of it's life, 
    //        and prevent children from inheriting my vx, vy values
    //  * Smoke:
    //      vy accelerates up (delta) but diminishes over time (control scales from 100% to 50%) 
    //        giving characteristics of smoke
    //      Scale increases (delta) initially, but diminishes to 25% in last 40% of it's life (control)
    //      Rotation is constant (delta) within range (min -2, max +2)

    var fire = {
        image: [ 'fire1', 'fire2', 'fire3' ],
        blendMode: 'HARD_LIGHT',
        lifespan: { min: 500, max: 800 },
        vx: { min: -1, max: 1 },
        vy: { value: -2, delta: -0.1 },
        scale: { value: 0.8, control : [ { x: 0, y: 1 }, { x: 1, y: 0.5 } ] },
        alpha: { value: 1, control: [ { x: 0, y: 0 }, { x: 0.5, y: 1 }, { x: 0.6, y: 1 }, { x: 1, y: 0 } ] },
        bringToFront: true,
        emit: {
            name: 'smoke',
            value: 4,
            control: [ { x: 0, y: 0 }, { x: 0.8, y: 0 }, { x: 1, y: 1 } ]
        }
    };

    var smoke = {
        image: 'smoke-puff',
        lifespan: { min: 700, max: 1000 },
        vx: 0,
        vy: { value: { min: -3, max: -2 }, delta: -0.05, control: [ { x: 0, y: 1 }, { x: 1, y: 0.5 } ] },
        scale: { value: { min: 0.4, max: 0.6 }, delta: 0.005, control: [ { x: 0, y: 1 }, { x: 0.6, y: 1 }, { x: 1, y: 0.25 } ] },
        alpha: { value: 0.3, control:[ { x: 0, y: 0 }, { x: 0.3, y: 1 }, { x: 1, y: 0 } ] },
        rotation: { value: 0, delta: { min: -2, max: 2 } },
        sendToBack: true
    };

    manager.addData('fire', fire);
    manager.addData('smoke', smoke);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    emitter.emit('fire', [380, 420], 400, { repeat: -1, frequency: 30 });

    game.add.image(432, 487, 'logo');

}

function update() {

}

function render() {

    emitter.debug(432, 522);

}

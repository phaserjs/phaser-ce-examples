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
var last = 0;

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.image('starfield', 'assets/particlestorm/starfield.jpg');

    game.load.path = 'assets/particlestorm/particles/';

    game.load.image('star2');
    game.load.image('smoke-puff');
    game.load.image('jewel_y', 'jewel_yellow.png');
    game.load.image('jewel_b', 'jewel_blue.png');
    game.load.image('jewel_g', 'jewel_green.png');
    game.load.image('jewel_r', 'jewel_red.png');
    game.load.image('jewel_p', 'jewel_purple.png');
    game.load.image('jewel_w', 'jewel_white.png');
    game.load.spritesheet('flareBlue', 'flareblue16.png', 256, 256, 16);

}

function create() {

    game.add.image(0, 0, 'starfield');

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var magicJewelEmitter = {
        image: 'jewel_w',
        visible: false,
        lifespan: 2500,
        emit: {
            name: ['magicJewel', 'magicJewel', 'spark', 'smoke', 'smoke', 'smoke'],
            value: 20,
            control: [ { x: 0, y: 0 }, { x: 0.5, y: 1 }, { x: 1, y: 0 } ] ,
            regionCircle: 20
        }
    };

    var magicJewel = {
        image: [ 'jewel_b', 'jewel_g', 'jewel_p', 'jewel_r', 'jewel_w', 'jewel_y' ],
        lifespan: 1500,
        rotation: { value: { min: -180, max: 180 }, delta: { min: -5, max: 5 } },
        vx: { value: { min: -5, max: 5 }, control: [ { x: 0, y: 0 }, { x: 0.40, y: 1 }, { x: 1, y: 0.1 } ] },
        vy: { value: { min: -7, max: -5 }, delta: 0.1 },
        scale: 0.8,
        alpha: { value: 1, control: [ { x: 0, y: 0 }, { x: 0.1, y: 1}, { x: 0.7, y: 1 }, { x: 1, y: 0.5 } ] },
        emit: { name: 'flareFall', at: [ { time: 1, value: 1 } ] }
    };

    var flareFall = {
        image: 'flareBlue',
        animations: { 'explode': { frameRate: 50, loop: true } },
        vy: { value: 2, control : [ { x: 0, y: 0 }, { x: 0.5, y: 0 }, { x: 1, y: 1 } ] },
        scale: { min: 0.2, max: 0.4 },
        alpha: 0.8
    };

    var smoke = {
        image: 'smoke-puff',
        lifespan: { min: 700, max: 1000 },
        vy: { value: { min: -3, max: -2 }, delta: -0.05, control: [ { x: 0, y: 1 }, { x: 1, y: 0.5 } ] },
        scale: { value: { min: 0.4, max: 0.6 }, delta: 0.005, control: [ { x: 0, y: 1 }, { x: 0.6, y: 1 }, { x: 1, y: 0.25 } ] },
        alpha: { value: 0.3, control: [ { x: 0, y: 0 }, { x: 0.3, y: 1 }, { x: 1, y: 0 } ] },
        rotation: { value: 0, delta: { min: -2, max: 2 } }
    };

    var spark = {
        image: 'star2',
        blendMode: 'HARD_LIGHT',
        lifespan: { min: 500, max: 1000 },
        scale: 0.2,
        vx: { value: { min: -1, max: 1 } },
        vy: { value: { min: -3, max: -2 }, delta: 0.01, control: [ { x: 0, y: 1 }, { x: 1, y: 0.5 } ] },
        alpha: { value: 1.0, control :[ { x: 0, y: 0 }, { x: 0.3, y: 1 }, { x: 1, y: 0 }] },
        rotation: { value: 0, delta: { min: -2.0, max: 2.0 } }
    };

    manager.addData('magicJewelEmitter', magicJewelEmitter);
    manager.addData('magicJewel', magicJewel);
    manager.addData('flareFall', flareFall);
    manager.addData('smoke', smoke);
    manager.addData('spark', spark);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    game.add.image(432, 487, 'logo');

    game.input.onDown.add(startJewels, this);

}

function startJewels() {

    if (last > game.time.time)
    {
        return;
    }

    emitter.emit('magicJewelEmitter', game.input.x, game.input.y);

    last = game.time.time + 3000;

}

function update() {

    if (last > game.time.time)
    {
        return;
    }

    emitter.emit('spark', game.input.x, game.input.y, { total: 1 });

}

function render() {

    game.debug.text("Move the mouse and click", 32, 32);

    emitter.debug(432, 522);

}

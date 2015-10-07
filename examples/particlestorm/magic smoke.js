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
    game.load.image('smoke_r', 'smokecolors.png');
    game.load.spritesheet('flareBlue', 'flareblue16.png', 256, 256, 16);

}

function create() {

    game.add.image(0, 0, 'starfield');

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var magicSmokeEmitter = {
        _image: 'smoke_r',
        visible: false,
        lifespan: 2500,
        emit: {
            name: 'magicSmoke',
            value: 2,
            control: [ { x: 0, y: 0 }, { x: 0.5, y: 1 }, { x: 1, y: 0 } ]
        }
    };

    var magicSmoke = {
        image: 'smoke_r',
        lifespan: 3000,
        rotation: { value: -90.0, delta: 4 },
        vy: -2,
        facingAcceleration: { initial: 0.1, value: 0, delta: 0 },
        scaleX: { value: 1.5, control: [ { x: 0, y: 0 }, { x: 0.5, y: 1 }, { x: 1, y: 0 } ] },
        scaleY: { value: 1.5, control: [ { x: 0, y: 0 }, { x: 0.5, y: 1 }, { x: 1, y: 0 } ] },
        alpha: 0.5,
        emit: {
            name: 'smokeSpark',
            value: 2,
            control: [ { x: 0, y: 0 }, { x: 0.5, y: 1 }, { x: 1, y: 0 } ]
        }
    };

    var smokeSpark = {
        image: 'flareBlue',
        animations: { 'explode': { frameRate: 50, loop: true } },
        blendMode: 'HARD_LIGHT',
        lifespan: { min: 500, max: 1000 },
        scale: 0.2,
        vx: { value: { min: -2, max: 2 } },
        vy: { value: { min: -3, max: -2 }, delta: 0.01, control: [ { x: 0, y: 1 }, { x: 1, y: 0.5 } ] },
        alpha: { value: 1.0, control :[ { x: 0, y: 0 }, { x: 0.3, y: 1 }, { x: 1, y: 0 }] },
        rotation: { value: 0, delta: { min: -2.0, max: 2.0 } }
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

    manager.addData('magicSmokeEmitter', magicSmokeEmitter);
    manager.addData('magicSmoke', magicSmoke);
    manager.addData('smokeSpark', smokeSpark);
    manager.addData('spark', spark);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    game.add.image(432, 487, 'logo');

    game.input.onDown.add(startSmoke, this);

}

function startSmoke() {

    if (last > game.time.time)
    {
        return;
    }

    emitter.emit('magicSmokeEmitter', game.input.x, game.input.y);

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

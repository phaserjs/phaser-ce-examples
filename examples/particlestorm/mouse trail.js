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

    game.load.path = 'assets/particlestorm/particles/';

    game.load.image('star2');

}

function create() {

    game.stage.backgroundColor = '#35072C';

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var spark = {
        image: 'star2',
        blendMode: 'HARD_LIGHT',
        lifespan: { min: 500, max: 1000 },
        scale: 0.1,
        vx: { value: { min: -1, max: 1 } },
        vy: { value: { min: -3, max: -2 }, delta: 0.01, control: [ { x: 0, y: 1 }, { x: 1, y: 0.5 } ] },
        alpha: { value: 1.0, control :[ { x: 0, y: 0 }, { x: 0.3, y: 1 }, { x: 1, y: 0 }] },
        rotation: { value: 0, delta: { min: -2.0, max: 2.0 } }
    };

    manager.addData('spark', spark);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    game.add.image(432, 487, 'logo');

}

function update() {

    emitter.emit('spark', game.input.x, game.input.y, { total: 1 });

}

function render() {

    game.debug.text('Move the mouse', 32, 32);

    emitter.debug(432, 522);

}

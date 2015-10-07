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

    game.load.images(['red', 'blue', 'yellow', 'white']);

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 6000,
        image: ['red', 'blue', 'yellow', 'white'],
        vy: { min: 1, max: 2 },
        blendMode: 'ADD',
        scale: { initial: 0, value: 0.7, control: [ { x: 0, y: 1 }, { x: 1, y: 0 } ] }
    };

    manager.addData('basic', data);

    emitter = manager.createEmitter();

    //  Create three Gravity Wells on the Emitter.
    var well1 = emitter.createGravityWell(200, 100, -0.5);
    var well2 = emitter.createGravityWell(300, 300, 6, 200);
    var well2 = emitter.createGravityWell(600, 400, 3, 200);

    circle = manager.createCircleZone(32);

    emitter.addToWorld();

    emitter.emit('basic', 0, 0, { zone: circle, total: 6, repeat: -1, frequency: 20 });

    game.add.image(432, 487, 'logo');

}

function update() {

    circle.shape.x = game.input.x;
    circle.shape.y = game.input.y;

}

function render() {

    game.debug.pixel(200, 100, '#ffff00', 4);
    game.debug.pixel(300, 300, '#ffff00', 4);
    game.debug.pixel(600, 400, '#ffff00', 4);

    game.debug.text("Move Mouse", 32, 32);

    emitter.debug(432, 522);

}

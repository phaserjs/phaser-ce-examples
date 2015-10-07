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
var well = null;

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.image('4x4', 'assets/particlestorm/particles/4x4.png');

    game.load.image('chick', 'assets/particlestorm/sprites/chick.png');

}

function create() {

    game.stage.backgroundColor = '#0D3FB8';

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 4000,
        image: '4x4',
        vy: { min: 0.5, max: 1 }
    };

    manager.addData('basic', data);

    emitter = manager.createEmitter();

    emitter.force.y = 0.1;

    //  Create a Gravity Well on the Emitter.
    well = emitter.createGravityWell(400, 260, -0.07, 1);

    var line = manager.createLineZone(100, 180, 700, 180);

    emitter.addToWorld();

    game.add.sprite(368, 260, 'chick');

    emitter.emit('basic', 0, 0, { zone: line, total: 8, repeat: -1, frequency: 50 });

    game.add.image(432, 487, 'logo');

}

function render() {

    emitter.debug(432, 522);

}

/**
* @author       Richard Davey <rich@photonstorm.com>
* @copyright    2015 Photon Storm Ltd.
* @license      {@link http://choosealicense.com/licenses/no-license/|No License}
* 
* @description  This example requires the Particle Storm Plugin to run.
*               For more details please see http://phaser.io/shop/plugins/particlestorm
*/

var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render  });

var manager = null;
var emitter = null;

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.image('star', 'assets/particlestorm/particles/star.png');
    game.load.image('star3', 'assets/particlestorm/particles/star3.png');

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 3000,
        image: [ 'star', 'star3' ],
        rotation: { delta: 1 },
        vx: { min: -2, max: 2 },
        vy: { min: -2, max: 2 }
    };

    manager.addData('basic', data);

    emitter = manager.createEmitter(Phaser.ParticleStorm.RENDERTEXTURE);

    emitter.addToWorld();

    emitter.emit('basic', 400, 300, { repeat: -1, frequency: 10 });

    game.add.image(432, 487, 'logo');

}

function update() {

}

function render() {

    emitter.debug(432, 522);

}

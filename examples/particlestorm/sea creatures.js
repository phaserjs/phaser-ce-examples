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

    game.load.path = 'assets/particlestorm/sprites/';

    game.load.atlas('seacreatures');

}

function create() {

    game.stage.backgroundColor = '#037caa';

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    //  Here we've multiple animations all from the same texture atlas.
    //  The 'play' parameter controls which one is played with the particle is emitted.
    //  By giving an array it'll randomly pick one of the animation names from the play array.

    var data = {
        lifespan: 12000,
        image: 'seacreatures',
        animations: { 
            'jellyfish': { frames: { start: 0, stop: 32, prefix: 'blueJellyfish', suffix: '', zeroPad: 4 }, frameRate: 20, loop: true },
            'flyingFish': { frames: ['flyingFish0000', 'flyingFish0001'], frameRate: 10, loop: true },
            'octopus': { frames: { start: 0, stop: 24, prefix: 'octopus', suffix: '', zeroPad: 4 }, frameRate: 30, loop: true },
            'electric': { frames: { start: 0, stop: 20, prefix: 'purpleFish', suffix: '', zeroPad: 4 }, frameRate: 50, loop: true },
            'seahorse': { frames: { start: 0, stop: 5, prefix: 'seahorse', suffix: '', zeroPad: 4 }, frameRate: 25, loop: true }
        },
        play: [ 'jellyfish', 'flyingFish', 'octopus', 'electric', 'seahorse' ],
        vx: { min: -0.5, max: -3 },
        vy: { min: -0.5, max: 0.5 }
    };

    manager.addData('basic', data);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    emitter.emit('basic', 900, [0, 600], { repeat: -1, frequency: 500 });

    game.add.image(432, 487, 'logo');

}

function render() {

    emitter.debug(432, 522);

}

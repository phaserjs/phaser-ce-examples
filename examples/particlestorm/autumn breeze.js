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
var wind = 0;

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.image('sky', 'assets/particlestorm/sprites/haze.png');

    game.load.path = 'assets/particlestorm/particles/';

    game.load.images(['leaf1' , 'leaf2']);

}

function create() {

    game.add.image(0, 0, 'sky');

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    //  This example illustrates:
    //  
    //  * Global forces applied on a per emitter basis (gravity and current)
    //  * Select an image from a list
    //  * Random vx within min / max limits
    //  * vy starts at zero, acceleration due to gravity force imposed externally, the control 
    //    scales it to near zero at 90% life (soft landing)
    //  * Set scale value directly to .25 (no object defining value, initial, etc)
    //  * Rotate back and forth several times, with an initial rotation offset of -90 (stem down) 
    //    and a value of 180 which is scaled by the control graph

    var leaves = {
        image: [ 'leaf1', 'leaf2' ],
        lifespan: 1850,
        vx: { min: -5, max: 5 },
        vy: { value: 0, control: [ { x: 0, y: 1 }, { x: 0.3, y: 1 }, { x: 0.9, y: 0.01 }, { x: 1, y: 0 } ] },
        scale: 0.25,
        rotation: { initial: -90, value: 180, control: [ { x: 0, y: 0 }, { x: 0.2, y: 0.5 }, { x: 0.4, y: 1 }, { x: 0.6, y: 0.5 }, { x: 1, y:0 } ] }
    };

    manager.addData('leaves', leaves);

    emitter = manager.createEmitter();

    emitter.force.y = 0.25;

    emitter.addToWorld();

    emitter.emit('leaves', [0, 800], -20, { repeat: -1, frequency: 20 });

    game.add.image(432, 487, 'logo');

}

function update() {

    //  Make a current that blows left or right slowly changing strength and direction
    wind = Math.max(Math.min(wind + (Math.random() - 0.5) * 0.02, 0.25), -0.25);

    emitter.force.x = wind;

}

function render() {

    emitter.debug(432, 522);

}

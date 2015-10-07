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

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    //  The controls are set so that the particle is spawned red but then
    //  fades into blue as the red channel is bought down to zero.

    var data = {
        lifespan: 3000,
        red: { value: 255, control: [ { x: 0, y: 1 }, { x: 1, y: 0 } ] },
        blue: { value: 255, control: [ { x: 0, y: 0 }, { x: 1, y: 1 } ] },
        vx: { min: -1, max: 1 },
        vy: { min: -1, max: 1 }
    };

    manager.addData('basic', data);

    var line = manager.createLineZone(100, 450, 700, 450);

    //  This creates a Pixel Renderer.
    //  It works by rendering just pixels (it can't render images or textures)
    //  The red, green and blue properties of the particle data control the
    //  color of the pixel particles.

    emitter = manager.createEmitter(Phaser.ParticleStorm.PIXEL, new Phaser.Point(0, -0.04));

    //  This will tell each particle to be 4x4 pixels in size
    emitter.renderer.pixelSize = 4;

    emitter.addToWorld();

    emitter.emit('basic', 0, 0, { zone: line, total: 4, repeat: -1, frequency: 10 });

    game.add.image(432, 487, 'logo');

}

function update() {

}

function render() {

    emitter.debug(432, 522);

}

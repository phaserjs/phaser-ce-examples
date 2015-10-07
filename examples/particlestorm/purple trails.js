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

    var data = {
        lifespan: 3000,
        red: { min: 200, max: 255 },
        green: 50,
        blue: { min: 200, max: 255 },
        vx: { min: -1, max: 1 },
        vy: { min: -2, max: -3 }
    };

    manager.addData('basic', data);

    var line = manager.createLineZone(100, 350, 700, 350);

    //  This creates a Pixel Renderer.
    //  It works by rendering just pixels (it can't render images or textures)
    //  The red, green and blue properties of the particle data control the
    //  color of the pixel particles.

    emitter = manager.createEmitter(Phaser.ParticleStorm.PIXEL, new Phaser.Point(0, 0.03));

    //  The autoClear property tells the Pixel emitter to not clear ifself before
    //  rendering. You can then clear it yourself via renderer.clear() (see the update method)
    emitter.renderer.autoClear = false;

    //  This will tell each particle to be 4x4 pixels in size
    emitter.renderer.pixelSize = 4;

    emitter.addToWorld();

    emitter.emit('basic', 0, 0, { zone: line, total: 8, repeat: -1, frequency: 60 });

    game.add.image(432, 487, 'logo');

}

function update() {

    emitter.renderer.clear(0.05);

}

function render() {

    emitter.debug(432, 522);

}

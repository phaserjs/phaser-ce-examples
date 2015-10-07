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
var image = null;

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.image('carrot', 'assets/particlestorm/carrot.png');

}

function create() {

    game.forceSingleUpdate = true;

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 0
    };

    manager.addData('basic', data);

    emitter = manager.createEmitter(Phaser.ParticleStorm.PIXEL);

    emitter.renderer.pixelSize = 8;

    emitter.addToWorld();

    image = manager.createImageZone('carrot');

    //  This will use the Pixel Emitter to display our carrot.png Image Zone
    //  Each 'pixel' is 8x8 so we set that as the spacing value
    //  
    //  The 'setColor' property tells the renderer to tint each 'pixel' to match the
    //  color of the respective pixel in the source image.

    emitter.emit('basic', 300, 200, { zone: image, full: true, spacing: 8, setColor: true });

    game.add.image(432, 487, 'logo');

    game.input.onDown.addOnce(startEffect, this);

}

function startEffect(pointer) {

    emitter.forEachNew(setVelocity, this, pointer.x, pointer.y);

    game.time.events.add(4000, newCarrot, this);

}

function setVelocity(particle, x, y) {

    particle.setLife(3000);

    particle.radiateFrom(x, y, 3);

}

function newCarrot() {

    emitter.emit('basic', 300, 200, { zone: image, full: true, spacing: 8, setColor: true });

    game.input.onDown.addOnce(startEffect, this);

}

function update() {

}

function render() {

    emitter.debug(432, 522);

    game.debug.text('Click around the carrot', 32, 32);

}

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
var textZone = null;

function preload() {

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.path = 'assets/particlestorm/particles/';

    game.load.images(['pixel_white', '4x4']);

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 0,
        image: 'pixel_white'
    };

    manager.addData('basic', data);

    var text = game.make.text(0, 0, 'PHASER', { font: '32px sans-serif' });

    //  This adds a linear gradient to the Text object, which we can
    //  reflect in our particles using the setColor and setAlpha properties.

    var grd = text.context.createLinearGradient(0, 0, 0, text.height);

    //  Add in 2 color stops
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');

    //  And apply to the Text
    text.fill = grd;

    //  Create a Text Zone, which is a special kind of zone that
    //  allows you to emit particles based on the pixels in a Phaser Text object.

    textZone = manager.createTextZone(text);

    //  This scales the Text Zone otherwise it's quite tiny to read.

    textZone.scale.set(4);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    //  Here we're using 'full: true' to emit one particle for every pixel in the
    //  Text Zone. The delay allows them to fall away in sequence.
    //  
    //  The setColor and setAlpha tell the particles to tint themselves to match
    //  the colors found in the Phaser.Text object.

    emitter.emit('basic', 150, 150, { zone: textZone, full: true, setColor: true, setAlpha: true });

    game.add.image(432, 487, 'logo');

    game.input.onDown.addOnce(startEffect, this);

}

function startEffect(pointer) {

    game.time.events.add(4000, makeText, this);

    emitter.forEachNew(setVelocity, this, pointer.x, pointer.y);

}

function setVelocity(particle, x, y) {

    particle.setLife(3000);

    particle.radiateFrom(x, y, 2);

}

function makeText() {

    game.input.onDown.add(startEffect, this);

    emitter.emit('basic', 150, 150, { zone: textZone, full: true, setColor: true, setAlpha: true });

}

function update() {

}

function render() {

    game.debug.text('Click around text', 32, 32);

    emitter.debug(432, 522);

}

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

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.path = 'assets/particlestorm/particles/';

    game.load.images(['pixel_white', '4x4']);

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 2000,
        image: 'pixel_white',
        vx: { min: -2, max: 2 },
        vy: { min: 1, max: 3 },
        scale: 0.5
    };

    manager.addData('basic', data);

    var text = game.add.text(0, 0, 'PHASER', { font: '32px serif' });

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

    var textZone = manager.createTextZone(text);

    //  This scales the Text Zone otherwise it's quite tiny to read.

    textZone.scale.set(4);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    //  Here we're using 'full: true' to emit one particle for every pixel in the
    //  Text Zone. The delay allows them to fall away in sequence.
    //  
    //  The setColor and setAlpha tell the particles to tint themselves to match
    //  the colors found in the Phaser.Text object.

    emitter.emit('basic', 150, 150, { zone: textZone, full: true, setColor: true, setAlpha: true, delay: { start: 3000, step: 10, visible: true } });

    game.add.image(432, 487, 'logo');

}

function update() {

}

function render() {

    emitter.debug(432, 522);

}

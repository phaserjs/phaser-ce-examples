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

    game.load.image('heart', 'assets/particlestorm/heart.png');

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 3000
    };

    manager.addData('basic', data);

    emitter = manager.createEmitter(Phaser.ParticleStorm.PIXEL);

    emitter.renderer.pixelSize = 8;

    emitter.addToWorld();

    //  12 x 10 = 96 x 80 px
    image = manager.createImageZone('heart');

    game.input.onDown.add(clickBoom, this);

    game.add.image(432, 487, 'logo');

}

function clickBoom(pointer) {

    var x = pointer.x;
    var y = pointer.y;

    //  This will apply the radiateFrom to only those particles emitted in this call
    emitter.emit('basic', x - 48, y - 40, { zone: image, full: true, spacing: 8, setColor: true, radiateFrom: { x: x, y: y, velocity: 1 } });

}

function update() {

}

function render() {

    emitter.debug(432, 522);

    game.debug.text("Click to explode", 32, 32);

}

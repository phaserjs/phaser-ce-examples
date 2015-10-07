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

    game.load.path = 'assets/particlestorm/particles/';

    game.load.images(['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7']);

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 3000,
        image: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7'],
        rotation: { delta: 2.5 },
        scale: { min: 0.5, max: 2 },
        vx: { min: -3, max: 3 },
        vy: { min: -1, max: 1 }
    };

    manager.addData('basic', data);

    //  This creates a BitmapData renderer. Instead of creating Sprites on the display list
    //  everything is rendered to a single BitmapData object instead. You can then add this
    //  to the world, or use it as texture for a sprite.

    emitter = manager.createEmitter(Phaser.ParticleStorm.BITMAP_DATA, new Phaser.Point(0.05, 0.05));

    //  Because the BitmapData can be used as a texture for a sprite, we can create lots
    //  of sprites that use the same texture (meaning you only have to draw the particles
    //  to the BitmapData once, but can re-use the whole thing)

    //  Create 32 sprites, stacked on-top of each other (each offset a little on the vertical)
    //  The tween is tweening on the horizontal, creating a 'snake like' wave
    for (var i = 0; i < 32; i++)
    {
        var sprite = game.add.sprite(i, 32-i, emitter.renderer.bmd);
        game.add.tween(sprite).to({ x: 64 }, 2000, 'Sine.easeInOut', true, 100 * i, -1, true);
    }

    emitter.emit('basic', 200, 150, { repeat: -1, frequency: 700 });

    game.add.image(432, 487, 'logo');

}

function render() {

    emitter.debug(432, 522);

}

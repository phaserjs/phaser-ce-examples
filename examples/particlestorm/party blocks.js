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

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.path = 'assets/particlestorm/particles/';

    game.load.images(['red', 'yellow', 'blue']);
    game.load.images(['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7']);

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        lifespan: 4000,
        image: ['red', 'yellow', 'blue'],
        blendMode: 'ADD',
        vx: { min: -2, max: 2 },
        vy: { min: -3, max: -2 },
        alpha: { control: 'linear' },
        _scale: { initial: 0.5, value: 2, control: 'linear' }
    };

    var data2 = {
        lifespan: 3000,
        image: ['block1', 'block2', 'block3', 'block4', 'block5', 'block6', 'block7'],
        vx: { min: -3, max: 3 },
        vy: { min: -1, max: -2 },
        scale: { initial: 0.5, value: 2, control: 'linear' },
        rotation: { value: 180, control: 'linear' }
    };

    manager.addData('glow', data);
    manager.addData('blocks', data2);

    //  This creates a BitmapData renderer. Instead of creating Sprites on the display list
    //  everything is rendered to a single BitmapData object instead. You can then add this
    //  to the world, or use it as texture for a sprite.

    //  This example shows a property that BitmapData renderers have: autoClear
    //  It allows you to turn off the fact the BitmapData is cleared every frame
    //  and you can then clear it yourself (as done in the 'update' function)
    //  The clear function has a property letting you specify the amount of alpha
    //  to use when clearing it, in this case 0.05 means it will leave a little trace
    //  of the original image behind, causing a nice 'blurred' effect, especially when
    //  combined with an ADD blend mode.

    emitter = manager.createEmitter(Phaser.ParticleStorm.BITMAP_DATA);

    emitter.renderer.autoClear = false;
    emitter.force.y = 0.04;

    emitter.addToWorld();

    emitter.emit('blocks', 400, 200, { repeat: -1, frequency: 150 });
    emitter.emit('glow', 400, 200, { repeat: -1, frequency: 150 });

    game.add.image(432, 487, 'logo');

}

function update() {

    emitter.renderer.clear(0.05);

}

function render() {

    emitter.debug(432, 522);

}

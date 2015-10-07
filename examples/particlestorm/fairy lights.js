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

    game.load.image('sky', 'assets/particlestorm/sprites/haze.png');

    game.load.path = 'assets/particlestorm/particles/';

    game.load.atlas('colorsHD');

}

function create() {

    game.add.image(0, 0, 'sky');

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    //  This example illustrates:
    //  
    //  * Selection from a list of image source names (image)
    //  * Random range between min and max values (lifespan, vx)
    //  * Simple control graph for constant downward acceleration (vy)
    //  * Simple control graph to shrink from full size to half size (scaleX, scaleY)
    //  * Simple control graph to fade alpha during the last half of it's life span
    //  * Emission of child particles at a rate determined by the control graph (emit)
    //  * glowyChild: Using scale instead of scaleX and scaleY to control both axis simultaneously
    //  * glowyChild: Simple control graph to fade alpha during it's entire life span

    var glowy = {
        image: 'colorsHD',
        frame: [ 'yellow', 'white' ],
        lifespan: { min: 600, max: 900 },
        vx: { value: { min: 4, max: 12 }, delta: -0.1 },
        vy: { value: { min: -15.0, max: -10 }, delta: 0.5 },
        scale : { value: 1, control: [ { x: 0, y: 1 }, { x: 1, y: 0.5 } ] },
        alpha: { value: 1, control: [ { x: 0, y: 1 }, { x: 0.5, y: 1 }, { x: 1, y: 0 } ] },
        emit: {
            name: 'glowyChild',
            value: 1,
            control: [ { x: 0, y: 0 }, { x: 0.2, y: 0 }, { x: 1, y: 1 } ]
        }
    };

    var glowyChild = {
        image: 'colorsHD',
        frame: [ 'red', 'green', 'blue' ],
        blendMode: 'HARD_LIGHT',
        lifespan: 1000,
        vx: { min: -4, max: 4 },
        vy: { value: { min: -10, max: -6 }, delta: 0.5 },
        scale: { value: { min: 0.5, max: 1 }, control: [ { x: 0, y: 1 }, { x: 1, y: 0.5 } ] },
        alpha: { value: 1, control: [ { x: 0, y: 1 }, { x: 1, y: 0 } ] }
    };

    manager.addData('glowy', glowy);
    manager.addData('glowyChild', glowyChild);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    emitter.emit('glowy', 0, 350, { repeat: -1, frequency: 500 });

    game.add.image(432, 487, 'logo');

}

function update() {


}

function render() {

    emitter.debug(432, 522);

}

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
var angle = 0;

function preload() {

    game.forceSingleUpdate = true;

    game.load.image('logo', 'assets/particlestorm/logo-flat.png');

    game.load.path = 'assets/particlestorm/particles/';

    game.load.atlas('colorsHD');

}

function create() {

    game.stage.backgroundColor = '#9B187F';

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var squareRod = {
        visible: false,
        lifespan: 2500,
        rotation: { initial: 0, delta: -0.5 },
        emit: {
            name: 'squareParticle',
            value: 3.0,
            control: [ { x: 0, y: 1 }, { x: 1, y: 1 } ],
            inherit: { angularVelocity: true }
        }
    };

    var squareParticle = {
        image: 'colorsHD',
        frame: ['red', 'blue', 'yellow', 'white'],
        lifespan: 5000,
        blendMode: 'ADD',
        scale: { value: 1.0, control: [ { x: 0, y: 0.2 }, { x: 0.9, y: 1 }, { x: 1, y: 0 } ] },
        sendToBack: true
    };

    manager.addData('squareRod', squareRod);
    manager.addData('squareParticle', squareParticle);

    emitter = manager.createEmitter();

    emitter.addToWorld();

    emitter.onEmit = new Phaser.Signal();
    emitter.onEmit.add(setRotation, this);

    emitter.emit('squareRod', 400, 300, { total: 4, repeat: -1, frequency: 3000 });

    game.add.image(432, 487, 'logo');

}

function setRotation(emitter, particle) {

    if (particle.key === 'squareParticle')
    {
        return;
    }

    particle.transform.rotation.initial = angle;

    angle += 90;

    if (angle === 360)
    {
        angle = 0;
    }

}

function render() {

    emitter.debug(432, 522);

}

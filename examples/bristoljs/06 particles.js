var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var manager = null;
var emitter = null;
var circle = null;

function preload() {

    game.load.path = 'assets/bristoljs/';

    game.load.images(['red', 'blue', 'yellow', 'white']);

}

function create() {

    manager = this.game.plugins.add(Phaser.ParticleStorm);

    var data = {
        image: ['red', 'blue', 'yellow', 'white'],
        vy: { min: 1, max: 2 },
        blendMode: 'ADD',
        scale: { initial: 0, value: 0.7, control: [ { x: 0, y: 1 }, { x: 1, y: 0 } ] }
    };

    manager.addData('basic', data);

    emitter = manager.createEmitter();

    //  1
    // var well1 = emitter.createGravityWell(200, 100, -0.5);
    // var well2 = emitter.createGravityWell(300, 300, 6, 200);
    // var well2 = emitter.createGravityWell(600, 400, 3, 200);

    circle = manager.createCircleZone(32);

    circle.shape.x = 400;
    circle.shape.y = 100;

    emitter.addToWorld();

    emitter.emit('basic', 0, 0, { zone: circle, total: 6, repeat: -1, frequency: 20 });

}

function update() {

    //  2
    // circle.shape.x = game.input.x;
    // circle.shape.y = game.input.y;

}

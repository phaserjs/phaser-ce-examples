
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

var emitter;

function preload() {

    game.load.image('diamond', 'assets/sprites/diamond.png');

}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.stage.backgroundColor = 0x337799;

    emitter = game.add.emitter(0, 0, 100);

    emitter.makeParticles('diamond');
    emitter.gravity = 200;

    game.input.onDown.addOnce(particleBurst, this);

}

function particleBurst(pointer) {

    emitter.x = pointer.x;
    emitter.y = pointer.y;

    emitter.start(true, 4000, null, 10);

    //  And 2 seconds later we'll destroy the emitter
    game.time.events.add(2000, destroyEmitter, this);

}

function destroyEmitter() {

    emitter.destroy();

}

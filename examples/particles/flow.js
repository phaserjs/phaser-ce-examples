
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

var emitter;

function preload() {

    game.load.image('sky', 'assets/skies/sky4.png');
    game.load.image('leaf', 'assets/particles/leaf1.png');

}

function create() {

    game.add.image(0, 0, 'sky');

    emitter = game.add.emitter(game.world.centerX, 0, 100);

    emitter.makeParticles('leaf');

    emitter.minParticleSpeed.setTo(-300, 30);
    emitter.maxParticleSpeed.setTo(300, 100);
    emitter.minParticleScale = 0.1;
    emitter.maxParticleScale = 0.5;
    emitter.gravity = 250;

    //  This will emit a quantity of 5 particles every 500ms. Each particle will live for 2000ms.
    //  The -1 means "run forever"
    emitter.flow(2000, 500, 5, -1);

    //  This will emit a single particle every 100ms. Each particle will live for 2000ms.
    //  The 100 means it will emit 100 particles in total and then stop.
    // emitter.flow(2000, 100, 1, 100);

}

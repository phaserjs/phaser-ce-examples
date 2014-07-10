
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create });

var emitter;

function preload() {

    game.load.image('glass', 'assets/particles/glass.png');
    game.load.image('water', 'assets/demoscene/blue-raster-floor.png');

}

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.tileSprite(0, 344, 800, 256, 'water');

    emitter = game.add.emitter(game.world.centerX, 200);

    emitter.makeParticles('glass');

    emitter.setXSpeed(-200, 200);
    emitter.setYSpeed(-150, -250);

    emitter.bringToTop = true;
    emitter.setAlpha(0.1, 1, 500);
    emitter.setScale(-2, 2, 1, 1, 3000, Phaser.Easing.Sinusoidal.InOut, true);
    emitter.gravity = 300;

    emitter.start(false, 5000, 700, 50);

}

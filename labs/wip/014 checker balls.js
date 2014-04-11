
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var emitter;
var x;

function preload() {

    game.load.image('bubble', 'assets/particles/bubble.png');
    // game.load.image('bubble', 'assets/demoscene/green_ball.png');
    // game.load.image('water', 'assets/demoscene/blue-raster-floor.png');
    // game.load.image('water', 'assets/demoscene/checker-floor.png');

}

function create() {

    game.stage.backgroundColor = '#002157';

    emitter = game.add.emitter(game.world.centerX, 32, 250);

    emitter.makeParticles('bubble');

    emitter.setXSpeed(0, 0);
    emitter.setYSpeed(300, 300);

    emitter.bringToTop = true;
    emitter.setRotation(0, 0);
    emitter.setAlpha(0.1, 1, 2000);
    emitter.setScale(0.1, 2, 0.1, 2, 4000);
    emitter.gravity = 150;

    emitter.start(false, 5000, 50);

    emitter.emitX = 100;

    game.add.tween(emitter).to( { emitX: 700 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);
    // game.add.tween(emitter).to( { emitX: 700 }, 2000, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);

}

function update() {


}


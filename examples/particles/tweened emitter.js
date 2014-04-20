
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var emitter;
var x;

function preload() {

    game.load.image('bubble', 'assets/particles/bubble.png');
    game.load.image('water', 'assets/demoscene/blue-raster-floor.png');

}

function create() {

    game.add.tileSprite(0, 344, 800, 256, 'water');

    emitter = game.add.emitter(game.world.centerX, 32, 250);

    emitter.makeParticles('bubble');

    emitter.setXSpeed(0, 0);
    emitter.setYSpeed(200, 200);

    emitter.bringToTop = true;
    emitter.setRotation(0, 0);
    emitter.setAlpha(0.1, 1, 2000);
    emitter.setScale(0.1, 2, 0.1, 2, 4000);
    emitter.gravity = 100;

    emitter.start(false, 5000, 50);

    emitter.emitX = 200;

    //game.add.tween(emitter).to( { emitX: 700 }, 2000, Phaser.Easing.Sinusoidal.InOut, true, 0, Number.MAX_VALUE, true);
    game.add.tween(emitter).to( { emitX: 600 }, 2000, Phaser.Easing.Back.InOut, true, 0, Number.MAX_VALUE, true);

}

function update() {


}


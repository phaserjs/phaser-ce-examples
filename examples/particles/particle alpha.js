
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, render: render });

var emitter;

function preload() {

    game.load.image('corona', 'assets/particles/blue.png');

}

function create() {

    game.stage.backgroundColor = '#000000';

    emitter = game.add.emitter(game.world.centerX, 500, 200);

    emitter.makeParticles('corona');

    emitter.setRotation(0, 0);
    emitter.setAlpha(0.3, 0.8);
    emitter.setScale(0.5, 1);
    emitter.gravity = -200;

    //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
    //	The 5000 value is the lifespan of each particle before it's killed
    emitter.start(false, 5000, 100);

}

function render() {
	// game.debug.text(emitter.total, 32, 32);
}